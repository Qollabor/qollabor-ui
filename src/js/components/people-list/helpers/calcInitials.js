export function calcInitials(fullName) {
  if (fullName && fullName.length > 0) {
    const initials = fullName.split(' ');
    return ((initials.shift()[0] + initials.pop()[0]).toUpperCase());
  }
  return 'XX';
}
