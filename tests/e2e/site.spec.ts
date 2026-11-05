import { expect, test, type Page } from "@playwright/test";

/** Lid API'ni ushlab, yuborilgan ma'lumotni qaytaradi (haqiqiy jadvalga yozilmaydi) */
async function mockLead(page: Page) {
  const sent: Record<string, unknown>[] = [];
  await page.route("**/api/lead", async (route) => {
    sent.push(route.request().postDataJSON());
    await route.fulfill({ json: { ok: true } });
  });
  return sent;
}

/** Hero CTA: intro va kirish animatsiyasi tugashini kutib bosiladi */
async function openHeroPopup(page: Page) {
  const cta = page.locator("[data-hero='cta']").getByRole("button");
  await expect(cta).toBeVisible({ timeout: 10_000 });
  await cta.click();
}

async function fillLead(page: Page) {
  const dialog = page.locator("dialog[open]");
  await dialog.getByPlaceholder(/Ismingiz|Ваше имя/).fill("Test");
  await dialog.getByPlaceholder("00-000-0000").pressSequentially("901234567");
  // Bot himoyasi: forma 2 soniyadan tez yuborilmaydi
  await page.waitForTimeout(2100);
  return dialog;
}

test("bosh sahifa: sarlavha, bo'limlar va anchor'lar", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Avalon residence/i);
  await expect(page.locator("html")).toHaveAttribute("lang", "uz");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/avalon residence/i);
  for (const id of ["loyihahaqida", "joylashuv", "faoliyathududlari", "rejalar", "aloqa"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  const width = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(width).toBeLessThanOrEqual(page.viewportSize()!.width);
});

test("til almashtirish: uz -> ru -> uz", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "Menyu" }).click();
  await page.getByRole("link", { name: "RU", exact: true }).first().click();
  await expect(page).toHaveURL(/\/ru$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/осознанный выбор/i);
  if (isMobile) await page.getByRole("button", { name: "Меню" }).click();
  await page.getByRole("link", { name: "Узб", exact: true }).first().click();
  await expect(page).toHaveURL(/\/$/);
});

test("popup: validatsiya, niqob va UTM bilan yuborish", async ({ page }) => {
  const sent = await mockLead(page);
  await page.goto("/?utm_source=google&utm_campaign=brand&gclid=test123");
  await openHeroPopup(page);
  const dialog = page.locator("dialog[open]");
  await expect(dialog).toBeVisible();

  await dialog.getByRole("button", { name: "YUBORISH" }).click();
  await expect(dialog.getByText("Ismingizni kiriting")).toBeVisible();
  await expect(dialog.getByText("Telefon raqamni to’liq kiriting")).toBeVisible();

  await fillLead(page);
  await expect(dialog.getByPlaceholder("00-000-0000")).toHaveValue("90-123-4567");
  await dialog.getByRole("button", { name: "YUBORISH" }).click();
  await expect(dialog.getByRole("status")).toContainText("Rahmat");

  expect(sent).toHaveLength(1);
  expect(sent[0]).toMatchObject({
    name: "Test",
    phone: "901234567",
    locale: "uz",
    source: "hero",
    attribution: { utm_source: "google", utm_campaign: "brand", gclid: "test123" },
  });

  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
});

test("rejalar: tab filtri va ariza reja id si bilan", async ({ page }) => {
  const sent = await mockLead(page);
  await page.goto("/");
  const plans = page.locator("#rejalar");
  // Bo'lim scroll'da paydo bo'ladi (data-reveal), shuning uchun avval unga boriladi
  await plans.scrollIntoViewIfNeeded();
  await plans.getByRole("tab", { name: "3" }).click();
  await expect(plans.locator("li")).toHaveCount(4);
  await plans.getByRole("tab", { name: "Jami" }).click();
  await expect(plans.locator("li")).toHaveCount(25);

  await plans.getByRole("tab", { name: "3" }).click();
  await plans.locator("li").first().getByRole("button").click();
  const dialog = await fillLead(page);
  await dialog.getByRole("button", { name: "YUBORISH" }).click();
  await expect(dialog.getByRole("status")).toBeVisible();
  expect(sent[0]).toMatchObject({ source: "plans", apartment: "3-01" });
});

test("server xatosida telefon raqami ko'rsatiladi", async ({ page }) => {
  await page.route("**/api/lead", (route) =>
    route.fulfill({ status: 502, json: { ok: false, error: "delivery_failed" } }),
  );
  await page.goto("/");
  await openHeroPopup(page);
  const dialog = await fillLead(page);
  await dialog.getByRole("button", { name: "YUBORISH" }).click();
  await expect(dialog.getByRole("alert")).toContainText("+998-78 113 73 73");
});

test("mobil menyu: ochiladi va havola bosilganda yopiladi", async ({ page, isMobile }) => {
  test.skip(!isMobile, "faqat mobil");
  await page.goto("/");
  await page.getByRole("button", { name: "Menyu" }).click();
  const menu = page.locator("dialog[open]");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Aloqa" }).click();
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page).toHaveURL(/#aloqa$/);
});

test("aloqa vidjeti: scroll'dan keyin chiqadi, Telegram va telefon", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Biz bilan bog'lanish" });
  const root = page.locator("[data-shown]");
  await expect(root).toHaveAttribute("data-shown", "false");
  await page.locator("#joylashuv").scrollIntoViewIfNeeded();
  await expect(root).toHaveAttribute("data-shown", "true");
  await toggle.click();
  const widget = page.locator("#contact-widget");
  await expect(widget.locator('a[href="https://t.me/avalonresidence_uz"]')).toBeVisible();
  await expect(widget.locator('a[href="tel:+998781137373"]')).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("API: bot va noto'g'ri ma'lumot", async ({ request }) => {
  const bot = await request.post("/api/lead", {
    data: { name: "Bot", phone: "901234567", company: "spam", elapsed: 0 },
  });
  expect(bot.status()).toBe(200);
  const invalid = await request.post("/api/lead", {
    data: { name: "A", phone: "123", elapsed: 5000 },
    headers: { "x-forwarded-for": "10.9.8.7" },
  });
  expect(invalid.status()).toBe(422);
  const fast = await request.post("/api/lead", {
    data: { name: "Test", phone: "901234567", elapsed: 100 },
  });
  expect(fast.status()).toBe(400);
});

test("SEO: robots, sitemap va JSON-LD", async ({ page, request }) => {
  expect((await request.get("/robots.txt")).ok()).toBe(true);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("https://avalonresidence.uz/ru");
  await page.goto("/ru");
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(ld!)).toMatchObject({ "@type": "ApartmentComplex", inLanguage: "ru" });
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/ru$/);
});
