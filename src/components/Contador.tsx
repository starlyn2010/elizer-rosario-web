"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Heart, Target, Calendar } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
}

function Counter({ end, suffix = "", label, icon: Icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <p className="text-4xl lg:text-5xl font-bold text-white mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-white/80 text-sm">{label}</p>
    </div>
  );
}

export default function Contador() {
  return (
    <section className="py-16 bg-gradient-to-r from-prm to-prm-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Counter end={12} suffix="+" label="Años como Docente" icon={Users} />
          <Counter end={6} suffix="+" label="Años Técnico Docente" icon={Target} />
          <Counter end={2000} suffix="+" label="Jóvenes Impactados" icon={Heart} />
          <Counter end={1} label="Comunidad Unida" icon={Calendar} />
        </div>
      </div>
    </section>
  );
}
