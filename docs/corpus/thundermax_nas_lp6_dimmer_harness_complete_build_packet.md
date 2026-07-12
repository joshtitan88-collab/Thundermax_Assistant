---
type: reference
title: LP6_Dimmer_Harness_Complete_Build_Packet
source: throttle-logic/LP6_Dimmer_Harness_Complete_Build_Packet.pdf
---

               LP6 Dimmer Switch / High-Low Harness Build Packet

         This packet provides a complete guide to building or sourcing a dimmer switch harness for Baja
         Designs LP6 lights. It includes a detailed component list, wiring diagrams, estimated pricing, and
         options for both DIY builds and plug-and-play solutions.

           Component                   Qty    Estimated Cost                     Details / Purchase Link

MICTUNING 40/30A Relay Harness Set 1               $32.90
                                                    https://mictuning.com/products/mictuning-40-30-amp-waterproof-relay-harness-
    Nilight 6-Pack 30/40A Relays        1          $11.99
                                                   https://www.nilight.com/products/nilight-g-re6-6-pack-automotive-relay-harness-
 DPDT 30A On-Off-On Toggle Switch       1 https://www.daierswitches.com/products/30a-12vdc-ip67-latching-dpdt-6-pin-on-off-on-to
                                                   $11.69
   Fuse Holder + 40A Blade Fuse         1          $5.00                 Available at AutoZone, O'Reilly, Amazon
       12-14ga + 16ga Wiring            -          $15.00                   Use high-quality automotive wiring
   Deutsch DT06-4S Connector Kit        -          $15.00                      https://www.bajadesigns.com
 Relay Sockets / Mounting Hardware      -          $15.00                         Weatherproof preferred


         DIY Total Estimated Cost: ~$95 - $100
         OEM Baja Designs Upfitter Harness: ~$97.95

         Recommendation: The OEM harness is easier and warranty-safe, but the DIY build offers more
         customization and equal reliability if done correctly.


         Wiring Overview:
         1. Run fused 12ga wire from battery + to Relay 1 terminal 30.
         2. Relay 1 coil (85/86) → Aux 1 switch trigger. Output (87) → Relay 2 terminal 30.
         3. Relay 2 coil (85/86) → Aux 2 trigger. Terminal 87a → LP6 Low Beam (Pin 1). Terminal 87 → LP6
         High Beam (Pin 4).
         4. LP6 Pin 3 → Ground. Optional Pin 2 → DRL/Amber Backlight.
         5. Relays isolate high and low power feeds to prevent overlap, protecting the LP6 driver board.


         This configuration supports two LP6 lights safely, handles up to 30A per relay, and prevents
         simultaneous high/low activation. For plug-and-play simplicity, consider the official Baja Designs
         Upfitter Harness instead.

