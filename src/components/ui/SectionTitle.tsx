import type { ReactNode } from 'react'

type SectionTitleProps = { id?: string; children: ReactNode; className?: string }

/** Título de seção centralizado (Poppins 600 20/26 no Figma). */
export function SectionTitle({ id, children, className = '' }: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={`text-center text-lg leading-[1.3] font-semibold text-balance md:text-xl ${className}`}
    >
      {children}
    </h2>
  )
}
