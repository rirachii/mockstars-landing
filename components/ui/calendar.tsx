'use client'

import React from 'react'

export type DateRange = { from?: Date; to?: Date }

export type CalendarProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  selected?: DateRange
  onSelect?: (value: DateRange) => void
  mode?: 'single' | 'multiple' | 'range' | string
  defaultMonth?: Date
  initialFocus?: boolean
  numberOfMonths?: number
}

export function Calendar(props: CalendarProps) {
  const { className, onSelect: _onSelect, ...rest } = props
  return <div className={className} {...rest} />
} 