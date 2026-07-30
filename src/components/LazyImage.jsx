import { useState } from 'react'
import { motion } from 'framer-motion'
import { DUR, EASE } from '../lib/motion'

/**
 * Images are always deferred — nothing above the fold waits on a download —
 * and they surface with a slow blur-off rather than a snap.
 */
export function LazyImage({ src, alt, className = '', wrapperClassName = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <span className={`relative block overflow-hidden ${wrapperClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={className}
        initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.04 }}
        animate={
          loaded
            ? { opacity: 1, filter: 'blur(0px)', scale: 1 }
            : { opacity: 0, filter: 'blur(10px)', scale: 1.04 }
        }
        transition={{ duration: DUR.slow, ease: EASE }}
        {...rest}
      />
    </span>
  )
}
