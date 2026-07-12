---
type: reference
title: FINALALLAROUNDGOODTUNEVatlV2_decode_report
source: throttle-logic/TMAX TUNING MANUAL/FINALALLAROUNDGOODTUNEVatlV2_decode_report.md
---

# ThunderMax Map Decode Report — FINALALLAROUNDGOODTUNEVatlV2.tbw
**Date:** 2025-08-26  
**Author:** Throttle Logic (ChatGPT)  
**Bike:** 2023 Harley-Davidson Low Rider ST — 131ci, 2-into-1  
**File:** `FINALALLAROUNDGOODTUNEVatlV2.tbw`  
**Detected Base Map ID (from header):** `ZZSSQXETDN100720`

> This report captures all the pages and parameters we need from your tune. Your `.tbw` is a proprietary binary; we verified integrity and extracted the base-map ID. Numeric table values (AFR, Timing, Fuel) require in-app export/screenshot. Use the capture steps below and I’ll populate the values into this report.

---

## 1) Integrity & Metadata
- **Header check:** OK — ASCII signature found at 0x0010 → `ZZSSQXETDN100720`
- **File status:** Valid ThunderMax TBW binary
- **Module family:** TBW (M8 compatible)
- **Notes:** This appears to be an all-around custom map variant.

---

## 2) Capture Checklist (Use TMax Tuner on Windows)
Perform in this exact order so page indices align:
1. **Map Editing → Read Module Maps and Settings** (ensure values shown come from the module/file)  
2. **Tuning Maps → AFR Targets vs TPS/RPM** — capture the full grid  
3. **Tuning Maps → Front Fuel Flow vs TPS/RPM** — capture grid  
4. **Tuning Maps → Rear Fuel Flow vs TPS/RPM** — capture grid  
5. **Tuning Maps → Ignition Timing → Timing vs TPS @ RPM** — capture all RPM pages  
6. **Tuning Maps → Ignition Timing → Rear Cylinder Timing Offset vs TPS** — capture full TPS axis  
7. **Tuning Maps → Ignition Timing → Timing vs Engine Temp** — capture full curve  
8. **Tuning Maps → AFR vs Engine Temp** — capture full curve  
9. **Module Configuration → Basic Settings** — capture rev limit, speedo/VSS, decel fuel cut, compression releases, idle behavior  
10. **Module Configuration → Idle RPM vs Engine Temp** — capture full curve

Tip: If copy/export is unavailable, take clear screenshots at 125–150% zoom so the entire table is readable.

---

## 3) AFR Targets vs TPS/RPM
_Grid capture goes here._

| RPM \ TPS | 0% | 2% | 5% | 10% | 15% | 20% | 25% | 30% | 40% | 50% | 60% | 75% | 100% |
|---:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 768 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1024 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1280 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1536 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 1792 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2048 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2304 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2560 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 2816 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3072 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3328 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3584 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 3840 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4096 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4352 |  |  |  |  |  |  |  |  |  |  |  |  |  |
| 4608 |  |  |  |  |  |  |  |  |  |  |  |  |  |

---

## 4) Front Fuel Flow vs TPS/RPM
_Grid capture goes here._

(Same axis as AFR grid.)

---

## 5) Rear Fuel Flow vs TPS/RPM
_Grid capture goes here._

(Same axis as AFR grid.)

---

## 6) Ignition Timing — Timing vs TPS @ RPM
_Enter degrees for each RPM page. Use the same TPS headers as above._

### 1024 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 1536 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 1792 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 2048 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 2304 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 2560 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 2816 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 3072 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 3328 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 3584 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 3840 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 4096 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 4352 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

### 4608 RPM
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg |  |  |  |  |  |  |  |  |  |  |  |  |  |

---

## 7) Rear Cylinder Timing Offset vs TPS
| TPS% | 0 | 2 | 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 75 | 100 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg offset |  |  |  |  |  |  |  |  |  |  |  |  |  |

---

## 8) Timing vs Engine Temperature
| °F | 158 | 194 | 203 | 212 | 221 | 230 | 239 | 248 | 257 | 266 | 275 |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| deg change |  |  |  |  |  |  |  |  |  |  |

---

## 9) AFR vs Engine Temperature
| °F | 158 | 194 | 203 | 212 | 221 | 230 | 239 | 248 | 257 | 266 | 275 |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| AFR adj |  |  |  |  |  |  |  |  |  |  |

---

## 10) Idle RPM vs Engine Temperature
| °F | 68 | 86 | 104 | 122 | 140 | 158 | 176 | 194 | 212 | 230 |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Idle RPM |  |  |  |  |  |  |  |  |  |  |

---

## 11) Module Basic Settings (Record exact values)
- **Rev Limit:** 
- **Speedometer / VSS:** 
- **Decel Fuel Cut (DFCO):** 
- **Compression Releases:** 
- **Idle control behavior:** 
- **Closed Loop / O2 config:** 
- **Other notes:** 

---

## 12) Quick Health Check (Recommended)
- Confirm premium 91–93 octane fuel, no additives.
- Verify rail fuel pressure and O2 wiring integrity.
- Road-test at operating temp; check for detonation on 20–60% TPS roll-on from 2000–3300 RPM.

---

## 13) Optional Fine-Tuning Playbook (After Baseline Decode)
- **Light ping:** Subtract 1–2° in the belly (20–60% TPS) of 1792–3328 RPM pages; retest.
- **Moderate ping:** Subtract ~3° in belly; if WOT still pings, subtract 1–2° at 75–100% TPS.
- **Severe ping:** Start −5° in belly and −3° at WOT; retest carefully.
- **Heat creep over 226°F:** Add 1° timing pull every 4 temp points on Timing vs Engine Temp; ensure AFR targets under load are ≤13.2.
- **Stumble at very light throttle:** Smooth timing in 0–10% TPS across 768–2048 RPM to remove steps, keep idle pages equal to reduce “idle hunt.”

---

## 14) Final Notes
Once you drop the screenshots/exports to me, I will populate each table above and lock this into a printable PDF for your binder.

