import { Box, Button, Dialog, Flex, Grid } from '@sanity/ui';
import { useEffect, useState } from 'react';
import { set, unset } from 'sanity';

import { hasArrayValues } from '@packages/utils/src/arrays';

import type { StringInputProps } from 'sanity';

export interface ImageSelectProps extends StringInputProps {
  buttonLabel?: string;
  /**
   * (Optional): path to image if not sitting in root of static file
   */
  dirPath?: `/${string}`;
}

const ImageSelect = (props: ImageSelectProps) => {
  const { buttonLabel, dirPath, onChange, schemaType, elementProps } = props,
    [open, setOpen] = useState(false),
    [selected, setSelected] = useState<string | undefined>(elementProps?.value || undefined),
    list = schemaType?.options?.list,
    // @ts-expect-error Moving fast for launch. fileType exists
    selectedFileType = list?.find(option => typeof option !== 'string' && option.value === selected)?.fileType;

  useEffect(() => {
    if (!set || !onChange) return;

    onChange(selected ? set(selected) : unset());
  }, [selected]);

  return (
    <Flex direction="column" gap={2}>
      {selected && (
        <img
          src={dirPath ? `/static${dirPath}/${selected}.${selectedFileType || 'jpg'}` : selected}
          alt={selected}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            aspectRatio: '16/9',
            borderRadius: '4px',
          }}
        />
      )}
      <Flex gap={2}>
        <Button onClick={() => setOpen(true)} mode="ghost" tone="primary" style={{ cursor: 'pointer' }}>
          {buttonLabel || 'Select Image'}
        </Button>
        {selected && (
          <Button
            onClick={() => {
              setSelected(undefined);
            }}
            mode="ghost"
            tone="critical"
            style={{ cursor: 'pointer' }}
          >
            Clear Selection
          </Button>
        )}
      </Flex>
      {open && (
        <Dialog
          id="image-select"
          header={buttonLabel || 'Select Image'}
          onClickOutside={() => setOpen(false)}
          width={900}
        >
          <Grid columns={3} gap={4} style={{ paddingInline: '24px' }}>
            {hasArrayValues(list) &&
              list.map(option => {
                const value = typeof option === 'string' ? option : option.value,
                  title = typeof option === 'string' ? option : option.title,
                  // @ts-expect-error Moving fast for launch. fileType exists
                  fileType = typeof option === 'string' ? 'jpg' : option.fileType;

                return (
                  <Box
                    key={value}
                    onClick={() => {
                      setSelected(value);
                      setOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      aspectRatio: '16/9',
                    }}
                  >
                    <img
                      src={dirPath ? `/static/${dirPath}/${value}.${fileType || 'jpg'}` : value}
                      alt={title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                  </Box>
                );
              })}
          </Grid>
        </Dialog>
      )}
    </Flex>
  );
};

export default ImageSelect;
