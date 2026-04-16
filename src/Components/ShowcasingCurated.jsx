import { useEffect } from "react";
import "../../src/index2.css";

import img1 from "../img1.jpg";
import img2 from "../img2.jpg";
import img3 from "../img3.jpg";
import img4 from "../img4.jpg";
import img5 from "../img5.jpg";
import img6 from "../img6.jpg";
import img7 from "../img7.jpg";
import img8 from "../img8.jpg";
import img9 from "../img9.jpg";
import img10 from "../img10.jpg";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const ShowcasingCurated = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const spotlightSection = document.querySelector(".spotlight");
    const projectIndex = document.querySelector(".project-index h1");
    const projectImgs = document.querySelectorAll(".project-img");
    const projectImagesContainer = document.querySelector(".project-images");
    const projectNames = document.querySelectorAll(".project-names p");
    const projectNamesContainer = document.querySelector(".project-names");

    if (
      !spotlightSection ||
      !projectIndex ||
      !projectImagesContainer ||
      !projectNamesContainer
    )
      return;

    const totalProjectCount = projectNames.length;

    const spotlightSectionHeight = spotlightSection.offsetHeight;

    const spotlightSectionPadding = parseFloat(
      getComputedStyle(spotlightSection).paddingTop
    );

    const projectIndexHeight = projectIndex.offsetHeight;
    const containerHeight = projectNamesContainer.offsetHeight;
    const imagesHeight = projectImagesContainer.offsetHeight;

    const moveDistanceIndex =
      spotlightSectionHeight -
      spotlightSectionPadding * 2 -
      projectIndexHeight;

    const moveDistanceNames =
      spotlightSectionHeight -
      spotlightSectionPadding * 2 -
      containerHeight;

    const moveDistanceImages = window.innerHeight - imagesHeight;

    const imgActivationThreshold = window.innerHeight / 2;

    ScrollTrigger.create({
      trigger: spotlightSection,
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      scrub: 1,

      onUpdate: (self) => {
        const progress = self.progress;

        const currentIndex = Math.min(
          Math.floor(progress * totalProjectCount) + 1,
          totalProjectCount
        );

        // INDEX TEXT
        projectIndex.textContent = `${String(currentIndex).padStart(
          2,
          "0"
        )}/${String(totalProjectCount).padStart(2, "0")}`;

        // MOVE INDEX
        gsap.set(projectIndex, {
          y: progress * moveDistanceIndex,
        });

        // MOVE IMAGES
        gsap.set(projectImagesContainer, {
          y: progress * moveDistanceImages,
        });

        // IMAGE OPACITY CONTROL
        projectImgs.forEach((img) => {
          const rect = img.getBoundingClientRect();

          if (
            rect.top <= imgActivationThreshold &&
            rect.bottom >= imgActivationThreshold
          ) {
            gsap.set(img, { opacity: 1 });
          } else {
            gsap.set(img, { opacity: 0.5 });
          }
        });

        // PROJECT NAMES ANIMATION
        projectNames.forEach((p, index) => {
          const start = index / totalProjectCount;
          const end = (index + 1) / totalProjectCount;

          const prog = Math.max(
            0,
            Math.min(1, (progress - start) / (end - start))
          );

          gsap.set(p, {
            y: -prog * moveDistanceNames,
          });

          gsap.set(p, {
            color: prog > 0 && prog < 1 ? "#fff" : "#4a4a4a",
          });
        });
      },
    });

    // CLEANUP (VERY IMPORTANT)
    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <>
      <section className="intro">
        <p>A collection of selected works</p>
      </section>

      <section className="spotlight">
        <div className="project-index">
          <h1>01/10</h1>
        </div>

        <div className="project-images">
          {[img1, img2, img3, img4, img5, img6, img7, img8, img9, img10].map(
            (img, i) => (
              <div className="project-img" key={i}>
                <img src={img} alt="" />
              </div>
            )
          )}
        </div>

        <div className="project-names">
          <p>Human Form Study</p>
          <p>Interior Light</p>
          <p>Project 21</p>
          <p>Shadow Portraits</p>
          <p>Everyday Objects</p>
          <p>Unit 07 Care</p>
          <p>Motion Practice</p>
          <p>Noonlight Series</p>
          <p>Material Stillness</p>
          <p>Quiet Walk</p>
        </div>
      </section>

      <section className="outro">
        <p>Scroll complete</p>
      </section>
    </>
  );
};

export default ShowcasingCurated;