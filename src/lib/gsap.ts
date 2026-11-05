"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { ease, duration } from "./motion";

/** GSAP plaginlari faqat bir marta, faqat brauzerda ro'yxatdan o'tadi */
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: ease.out, duration: duration.base });

export { gsap, ScrollTrigger, SplitText, useGSAP };
