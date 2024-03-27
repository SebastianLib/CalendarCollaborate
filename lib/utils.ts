import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const firstDayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]

export const dayNames = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

export const months = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
]

export const shortcutMonths = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
]

export const colors = ["blue", "red", "green", "orange", "purple"]

export const linksArray = [
  { href: '/create', label: 'Create' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/teams', label: 'Teams' },
  { href: '/profile', label: 'My Profile' },
];
