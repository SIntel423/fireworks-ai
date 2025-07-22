import { SearchIcon } from '@sanity/icons';
import { Box, Button, Card, Dialog, Flex, Grid, Tab, TabList, Text, TextInput, usePrefersDark } from '@sanity/ui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { type StringInputProps, set, unset } from 'sanity';

// Import the original icon lists for backward compatibility
import { miscIds, socialIds } from '@packages/ui/icons';

// Import our updated Icon component with the extended interface
import Icon from '@/components/Icon';

// Define categories
const categories = {
  all: 'All Icons',
  ui: 'UI/Interface',
  media: 'Media',
  navigation: 'Navigation',
  social: 'Social Media',
  misc: 'Miscellaneous',
};

// Helper function to determine icon category based on name
const getCategoryForIcon = (iconId: string): keyof typeof categories => {
  // First, check if it's in the original categories for backward compatibility
  if (miscIds.some(id => id === iconId)) return 'social'; // Original miscIds were actually social media icons
  if (socialIds.some(id => id === iconId)) return 'ui'; // Original socialIds were UI elements

  // For new icons, categorize based on name patterns
  if (iconId.includes('user') || iconId.includes('share') || 
      iconId.includes('twitter') || iconId.includes('youtube') || 
      iconId.includes('instagram') || iconId.includes('facebook') || 
      iconId.includes('linkedin'))
    return 'social';
  
  if (iconId.includes('arrow') || iconId.includes('navigation') || 
      iconId.includes('map') || iconId.includes('compass') || 
      iconId.includes('location'))
    return 'navigation';
  
  if (iconId.includes('image') || iconId.includes('video') || 
      iconId.includes('camera') || iconId.includes('film') || 
      iconId.includes('music') || iconId.includes('play'))
    return 'media';
  
  if (iconId.includes('button') || iconId.includes('menu') || 
      iconId.includes('cursor') || iconId.includes('check') || 
      iconId.includes('x-') || iconId.includes('plus') || 
      iconId.includes('minus'))
    return 'ui';
  
  return 'misc';
};

export const IconPickerInput = (props: StringInputProps) => {
  const { value, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<keyof typeof categories>('all');
  const prefersDark = usePrefersDark();
  
  // State to store all available icon IDs
  const [allIcons, setAllIcons] = useState<Array<{ id: string; category: keyof typeof categories }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract icon IDs from the sprite file
  useEffect(() => {
    const fetchIcons = async () => {
      setIsLoading(true);
      try {
        // Start with the original icons for backward compatibility
        const originalIcons = [
          ...miscIds.map(id => ({ id, category: 'social' as keyof typeof categories })),
          ...socialIds.map(id => ({ id, category: 'ui' as keyof typeof categories })),
        ];
        
        // Fetch the SVG sprite file
        const response = await fetch('/static/icons/sprites.svg');
        const svgText = await response.text();
        
        // Create a temporary DOM element to parse the SVG
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        // Extract all symbol IDs
        const symbols = svgDoc.querySelectorAll('symbol');
        const spriteIcons: Array<{ id: string; category: keyof typeof categories }> = [];
        
        symbols.forEach(symbol => {
          const id = symbol.getAttribute('id');
          if (id && !originalIcons.some(icon => icon.id === id))
            spriteIcons.push({
              id,
              category: getCategoryForIcon(id),
            });
        });
        
        // Combine original icons with sprite icons
        setAllIcons([...originalIcons, ...spriteIcons]);
      } catch (error) {
        console.error('Error fetching icons:', error);
        // Fallback to original icons if there's an error
        setAllIcons([
          ...miscIds.map(id => ({ id, category: 'social' as keyof typeof categories })),
          ...socialIds.map(id => ({ id, category: 'ui' as keyof typeof categories })),
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchIcons();
  }, []);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleIconSelect = useCallback(
    (iconId: string) => {
      onChange(iconId ? set(iconId) : unset());
      closeModal();
    },
    [onChange, closeModal],
  );

  const handleClearSelection = useCallback(() => {
    onChange(unset());
  }, [onChange]);

  const filteredIcons = useMemo(
    () =>
      allIcons
        .filter(icon => currentCategory === 'all' || icon.category === currentCategory)
        .filter(icon => icon.id.toLowerCase().includes(searchTerm.toLowerCase())),
    [allIcons, searchTerm, currentCategory],
  );

  // Basic style objects to replace inline styles for critical parts
  const iconGridContainerStyle: React.CSSProperties = { maxHeight: '400px', overflowY: 'auto' };
  const iconCardStyle: React.CSSProperties = { textAlign: 'center', cursor: 'pointer' };
  const iconNameTextStyle: React.CSSProperties = { wordBreak: 'break-all' };
  // Style for the icon container that respects dark/light mode
  const iconContainerStyle: React.CSSProperties = { 
    // No need to set color - let icons inherit from Sanity's text color
    padding: '4px',
    borderRadius: '4px',
    // Enhance contrast for better visibility
    background: prefersDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
  };

  return (
    <Flex align="center" gap={2}>
      {value && (
        <Card padding={2} border radius={2} marginRight={2}>
          <div style={iconContainerStyle}>
            <Icon icon={value} size={24} />
          </div>
        </Card>
      )}
      <Button onClick={openModal} text={value ? 'Change icon' : 'Select icon'} mode="ghost" />
      {value && (
        <Button onClick={handleClearSelection} text="Clear" mode="ghost" tone="critical" />
      )}

      {isOpen && (
        <Dialog
          header="Icon Picker"
          id="icon-picker-dialog"
          onClose={closeModal}
          width={2}
          zOffset={1000}
        >
          <Box padding={4}>
            <Flex direction="column" gap={4}>
              <TextInput
                icon={SearchIcon}
                placeholder="Search Icons"
                value={searchTerm}
                onChange={event => setSearchTerm(event.currentTarget.value)}
              />

              <TabList space={2}>
                {Object.entries(categories).map(([key, title]) => (
                  <Tab
                    key={key}
                    id={`${key}-tab`}
                    label={title}
                    onClick={() => setCurrentCategory(key as keyof typeof categories)}
                    selected={currentCategory === key}
                    aria-controls={`${key}-panel`}
                    style={prefersDark && currentCategory === key ? { color: 'white' } : {}}
                  />
                ))}
              </TabList>

              <Box style={iconGridContainerStyle} paddingY={2}>
                {isLoading && (
                  <Flex align="center" justify="center" padding={4}>
                    <Text>Loading icons...</Text>
                  </Flex>
                )}
                {!isLoading && filteredIcons.length === 0 && (
                  <Flex align="center" justify="center" padding={4} direction="column" gap={3}>
                    <Text>No icons found matching your search.</Text>
                    <Button text="Clear search" onClick={() => setSearchTerm('')} mode="ghost" />
                  </Flex>
                )}
                {!isLoading && filteredIcons.length > 0 && (
                  <Grid columns={[2, 3, 4, 5]} gap={[2, 3, 4]} padding={2}>
                    {filteredIcons.map(iconInfo => (
                      <Card
                        key={iconInfo.id}
                        padding={[2, 3]}
                        radius={2}
                        shadow={1}
                        style={iconCardStyle}
                        onClick={() => handleIconSelect(iconInfo.id)}
                        aria-selected={value === iconInfo.id}
                        tone={value === iconInfo.id ? 'primary' : 'default'}
                        selected={value === iconInfo.id}
                      >
                        <Flex direction="column" align="center" justify="center" gap={2}>
                          <div style={iconContainerStyle}>
                            <Icon icon={iconInfo.id} size={32} />
                          </div>
                          <Text size={1} muted={value !== iconInfo.id} style={iconNameTextStyle}>
                            {iconInfo.id}
                          </Text>
                        </Flex>
                      </Card>
                    ))}
                    {filteredIcons.length === 0 && !isLoading && (
                      <Box padding={3}>
                        <Text>No icons found.</Text>
                      </Box>
                    )}
                  </Grid>
                )}
              </Box>
            </Flex>
          </Box>
        </Dialog>
      )}
    </Flex>
  );
};
