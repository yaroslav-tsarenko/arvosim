const countryFlags: Record<string, string> = {
  'United Kingdom': '🇬🇧', 'France': '🇫🇷', 'Germany': '🇩🇪', 'Spain': '🇪🇸',
  'Italy': '🇮🇹', 'Poland': '🇵🇱', 'Turkey': '🇹🇷', 'Ukraine': '🇺🇦',
  'Georgia': '🇬🇪', 'Moldova': '🇲🇩', 'Japan': '🇯🇵', 'China': '🇨🇳',
  'South Korea': '🇰🇷', 'Thailand': '🇹🇭', 'Vietnam': '🇻🇳', 'Singapore': '🇸🇬',
  'Malaysia': '🇲🇾', 'Indonesia': '🇮🇩', 'India': '🇮🇳', 'Egypt': '🇪🇬',
  'UAE': '🇦🇪', 'United Arab Emirates': '🇦🇪', 'Saudi Arabia': '🇸🇦',
  'Jordan': '🇯🇴', 'Qatar': '🇶🇦', 'Oman': '🇴🇲', 'Bahrain': '🇧🇭', 'Kuwait': '🇰🇼',
  'United States': '🇺🇸', 'Canada': '🇨🇦', 'Mexico': '🇲🇽', 'Brazil': '🇧🇷',
  'Argentina': '🇦🇷', 'Colombia': '🇨🇴', 'Chile': '🇨🇱', 'Peru': '🇵🇪',
  'Australia': '🇦🇺', 'New Zealand': '🇳🇿', 'South Africa': '🇿🇦', 'Morocco': '🇲🇦',
  'Kenya': '🇰🇪', 'Nigeria': '🇳🇬', 'Portugal': '🇵🇹', 'Netherlands': '🇳🇱',
  'Switzerland': '🇨🇭', 'Austria': '🇦🇹', 'Greece': '🇬🇷', 'Czech Republic': '🇨🇿',
  'Sweden': '🇸🇪',
};

export function getFlagForCountry(name: string): string {
  return countryFlags[name] || '🏳️';
}
