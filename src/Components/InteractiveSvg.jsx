import { useEffect } from "react";
import { gsap } from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../../src/index1.css";

import img_1 from "../assets/img_1.jpg";
import img_2 from "../assets/img_2.jpg";
import img_3 from "../assets/img_3.jpg";
import img_4 from "../assets/img_4.jpg";

const InteractiveSvg = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ✅ Lenis setup
    const lenis = new Lenis({
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    // ✅ Final positions (fixed)
    const spotlightImgFinalPos = [
      [-140, -140],
      [40, -130],
      [-160, 40],
      [20, 30],
    ];

    const spotlightImages = document.querySelectorAll(".spotlight-img");

    // ✅ ScrollTrigger animation
    const trigger = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 6}`,
      pin: true,
      scrub: 1,

      onUpdate: (self) => {
        const progress = self.progress;

        const initialRotations = [5, -3, 3.5, -1];
        const phaseOneStartOffsets = [0, 0.1, 0.2, 0.3];
        const phaseTwoStartOffsets = [0.5, 0.55, 0.6, 0.65];

        spotlightImages.forEach((img, index) => {
          const initialRotation = initialRotations[index];

          let x = -50;
          let y = 200;
          let rotation = initialRotation;

          // 🔹 Phase 1 (enter animation)
          const phase1Start = phaseOneStartOffsets[index];
          const phase1End = Math.min(
            phase1Start + (0.45 - phase1Start) * 0.9,
            0.45
          );

          if (progress >= phase1Start && progress <= 0.45) {
            let p;

            if (progress >= phase1End) {
              p = 1;
            } else {
              const linear =
                (progress - phase1Start) / (phase1End - phase1Start);
              p = 1 - Math.pow(1 - linear, 3);
            }

            y = 200 - p * 250;
          } else if (progress > 0.45) {
            y = -50;
          }

          // 🔹 Phase 2 (spread animation)
          const phase2Start = phaseTwoStartOffsets[index];
          const phase2End = Math.min(
            phase2Start + (0.95 - phase2Start) * 0.9,
            0.95
          );

          const [finalX, finalY] = spotlightImgFinalPos[index];

          if (progress >= phase2Start && progress <= 0.95) {
            let p;

            if (progress >= phase2End) {
              p = 1;
            } else {
              const linear =
                (progress - phase2Start) / (phase2End - phase2Start);
              p = 1 - Math.pow(1 - linear, 3);
            }

            x = -50 + (finalX + 50) * p;
            y = -50 + (finalY + 50) * p;
            rotation = initialRotation * (1 - p);
          } else if (progress > 0.95) {
            x = finalX;
            y = finalY;
            rotation = 0;
          }

          gsap.set(img, {
            transform: `translate(${x}%, ${y}%) rotate(${rotation}deg)`,
          });
        });
      },
    });

    // ✅ Cleanup
    return () => {
      lenis.destroy();
      trigger.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <section className="intro">
        <h1>The art of selling becomes the art of sensing.</h1>
      </section>

      <section className="spotlight">
        <div className="spotlight-header">
          <h1>Time stretches differently inside the frame.</h1>
        </div>

        <div className="spotlight-images">
          <div className="spotlight-img">
            <img src={img_1} alt="" />
          </div>

          <div className="spotlight-img">
            <img src={img_2} alt="" />
          </div>

          <div className="spotlight-img">
            <img src={img_3} alt="" />
          </div>

          <div className="spotlight-img">
            <img src={img_4} alt="" />
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>We make visuals breathe with quiet precision.</h1>
      </section>
    </>
  );
};

export default InteractiveSvg;