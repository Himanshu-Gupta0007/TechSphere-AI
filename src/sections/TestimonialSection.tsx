import SectionTitle from "../components/SectionTitle";
import TestimonialCard from "../components/TestimonialCard";
import { testimonialsData } from "../data/testimonial";
import type { ITestimonial } from "../types";
import Marquee from "react-fast-marquee";

export default function TestimonialSection() {
  return (
    <div id="testimonials" className="px-4 md:px-16 lg:px-24 xl:px-32">
      <SectionTitle
        text1="Testimonials"
        text2="Trusted by creators & teams"
        text3="See how people are using TechSphere AI to work faster, smarter, and more efficiently every day."
      />

      {/* Left to right */}
      <Marquee
        className="max-w-5xl mx-auto mt-11"
        gradient={true}
        speed={25}
        gradientColor="#000"
      >
        <div className="flex items-center justify-center py-5 overflow-hidden">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={`left-${index}`}
                index={index}
                testimonial={testimonial}
              />
            )
          )}
        </div>
      </Marquee>

      {/* Right to left */}
      <Marquee
        className="max-w-5xl mx-auto"
        gradient={true}
        speed={25}
        direction="right"
        gradientColor="#000"
      >
        <div className="flex items-center justify-center py-5 overflow-hidden">
          {[...testimonialsData, ...testimonialsData].map(
            (testimonial: ITestimonial, index: number) => (
              <TestimonialCard
                key={`right-${index}`}
                index={index}
                testimonial={testimonial}
              />
            )
          )}
        </div>
      </Marquee>
    </div>
  );
}
