'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  highlightTerms = []
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    if (typeof children !== 'string') return children;

    const text = children;
    const isCharHighlighted = new Array(text.length).fill(false);

    for (const term of highlightTerms) {
      if (!term) continue;
      let pos = 0;
      while ((pos = text.toLowerCase().indexOf(term.toLowerCase(), pos)) !== -1) {
        for (let i = pos; i < pos + term.length; i++) {
          isCharHighlighted[i] = true;
        }
        pos += term.length;
      }
    }

    const tokens = [];
    const regex = /\S+|\s+/g;
    let match;
    let index = 0;
    while ((match = regex.exec(text)) !== null) {
      const segment = match[0];
      const start = match.index;
      if (/^\s+$/.test(segment)) {
        tokens.push(segment);
      } else {
        const isHighlight = isCharHighlighted[start];
        tokens.push(
          <span
            key={index++}
            className={`word ${isHighlight ? 'highlight' : ''}`}
            style={
              isHighlight
                ? {
                    color: '#2F6BFF',
                    textShadow:
                      '-1px -1px 0 #000, 0px -1px 0 #000, 1px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, -1px 1px 0 #000, 0px 1px 0 #000, 1px 1px 0 #000'
                  }
                : undefined
            }
          >
            {segment}
          </span>
        );
      }
    }
    return tokens;
  }, [children, highlightTerms]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    const rotTween = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    const opTween = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );

    let blurTween = null;
    if (enableBlur) {
      blurTween = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      rotTween.scrollTrigger?.kill();
      rotTween.kill();
      opTween.scrollTrigger?.kill();
      opTween.kill();
      if (blurTween) {
        blurTween.scrollTrigger?.kill();
        blurTween.kill();
      }
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`}>{splitText}</div>
    </div>
  );
};

export default ScrollReveal;
