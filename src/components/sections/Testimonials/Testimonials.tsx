"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { testimonials } from "./constants";

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Campers Say
        </h2>

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={false}
          className="py-4"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="mx-4 min-w-[300px] max-w-[300px] bg-white border border-gray-100 rounded-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 relative overflow-hidden border border-gray-100 rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </Marquee>

        <Marquee
          gradient={false}
          speed={40}
          pauseOnHover={false}
          direction="right"
          className="py-4"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="mx-4 min-w-[300px] max-w-[300px] bg-white border border-gray-100 rounded-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 relative rounded-full overflow-hidden border border-gray-100">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
