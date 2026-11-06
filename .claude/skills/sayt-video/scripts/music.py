"""Sokin, iliq fon musiqasi (o'z kompozitsiyam): pad, yumshoq pianino arpedjio, bass, reverb.
Akkordlar: Dmaj9 - Bm9 - Gmaj7 - A6sus, ~72 BPM. Natija: 44.1 kHz stereo WAV."""
import sys
import wave
import numpy as np

SR = 44100
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 66.0
OUT = sys.argv[1] if len(sys.argv) > 1 else "music.wav"
rng = np.random.default_rng(7)
N = int(SR * DUR)
L = np.zeros(N)
R = np.zeros(N)


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def add(buf, start, sig):
    s = int(start * SR)
    if s >= N:
        return
    e = min(N, s + len(sig))
    buf[s:e] += sig[: e - s]


def pad_note(m, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    sig = np.zeros_like(t)
    for det in (-0.06, 0.0, 0.05):  # kichik detune: iliq "xor" ovozi
        f = hz(m + det)
        for k, a in ((1, 1.0), (2, 0.35), (3, 0.12), (4, 0.05)):
            sig += a * np.sin(2 * np.pi * f * k * t + rng.uniform(0, 6.28))
    atk, rel = 1.6, 2.2
    env = np.minimum(1, t / atk) * np.minimum(1, np.maximum(0, (dur - t) / rel))
    trem = 1 + 0.05 * np.sin(2 * np.pi * 0.18 * t)
    return amp * sig * env * trem / 3


def piano(m, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    f = hz(m)
    sig = np.zeros_like(t)
    for k, a, d in ((1, 1.0, 1.6), (2, 0.45, 1.1), (3, 0.18, 0.7), (4, 0.08, 0.5), (5, 0.04, 0.35)):
        sig += a * np.sin(2 * np.pi * f * k * 1.0008 ** k * t) * np.exp(-t / d)
    atk = np.minimum(1, t / 0.006)
    return amp * sig * atk


def bass(m, dur, amp):
    t = np.arange(int(dur * SR)) / SR
    f = hz(m)
    sig = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    env = np.minimum(1, t / 0.08) * np.exp(-t / 3.5) * np.minimum(1, np.maximum(0, (dur - t) / 0.4))
    return amp * sig * env


BPM = 72
beat = 60 / BPM
bar = 4 * beat
# (bass, pad notalari, arpedjio notalari)
chords = [
    (38, [50, 54, 57, 61, 64], [62, 66, 69, 73, 76, 73, 69, 66]),  # Dmaj9
    (35, [47, 50, 54, 57, 61], [59, 62, 66, 69, 73, 69, 66, 62]),  # Bm9
    (31, [43, 47, 50, 54, 57], [55, 59, 62, 66, 71, 66, 62, 59]),  # Gmaj7
    (33, [45, 50, 52, 54, 57], [57, 62, 64, 66, 69, 66, 64, 62]),  # A6sus
]
t0 = 0.0
i = 0
while t0 < DUR:
    b, padn, arp = chords[i % 4]
    for m in padn:
        sig = pad_note(m, bar + 1.8, 0.055)
        add(L, t0, sig * 1.0)
        add(R, t0 + 0.012, sig * 0.95)
    add(L, t0, bass(b, bar, 0.16))
    add(R, t0, bass(b, bar, 0.16))
    # arpedjio 2-taktdan boshlab kiradi, oxirgi taktlarda siyraklashadi
    if t0 >= bar * 1:
        for j, m in enumerate(arp):
            if t0 > DUR - bar * 1.5 and j % 2:
                continue
            st = t0 + j * beat / 2 + rng.uniform(-0.008, 0.008)
            vel = 0.11 * (0.85 + 0.3 * rng.random()) * (1.0 if j % 4 == 0 else 0.8)
            pan = 0.5 + 0.35 * np.sin(j * 0.9)
            sig = piano(m, 3.2, vel)
            add(L, st, sig * (1.2 - pan))
            add(R, st, sig * (0.4 + pan))
    t0 += bar
    i += 1


def reverb(x, secs=3.2, mix=0.32, seed=1):
    n = int(secs * SR)
    r = np.random.default_rng(seed)
    ir = r.standard_normal(n) * np.exp(-np.arange(n) / (SR * secs / 6.5))
    # yuqori chastotalarni yumshatish (oddiy past o'tkazgich)
    k = 24
    ir = np.convolve(ir, np.ones(k) / k, mode="same")
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return x * (1 - mix) + wet * mix * 3.0


L = reverb(L, seed=1)
R = reverb(R, seed=2)
# boshida va oxirida yumshoq kirish/chiqish
fade_in, fade_out = int(2.5 * SR), int(4.0 * SR)
env = np.ones(N)
env[:fade_in] = np.linspace(0, 1, fade_in) ** 2
env[-fade_out:] = np.linspace(1, 0, fade_out) ** 1.5
L *= env
R *= env
peak = max(np.abs(L).max(), np.abs(R).max())
L, R = L / peak * 0.89, R / peak * 0.89
data = (np.stack([L, R], axis=1) * 32767).astype(np.int16)
with wave.open(OUT, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(data.tobytes())
print("ok", OUT, DUR)
