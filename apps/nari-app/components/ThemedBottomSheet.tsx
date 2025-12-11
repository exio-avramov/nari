import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import type {
  BottomSheetBackdropProps,
  BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedBottomSheetProps = {
  children: React.ReactNode;
  snapPoints?: string[];
  isVisible?: boolean;
  onClose?: () => void;
} & BottomSheetProps;

export type ThemedBottomSheetRef = {
  open: () => void;
  close: () => void;
};

const ThemedBottomSheet = forwardRef<
  ThemedBottomSheetRef,
  ThemedBottomSheetProps
>(({ children, isVisible, onClose, ...props }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Get all themed colors
  const backdropColor = useThemeColor({}, "backdrop");
  const sheetBackground = useThemeColor({}, "bottomSheetBackground");
  const handleColor = useThemeColor({}, "bottomSheetHandle");
  const borderColor = useThemeColor({}, "bottomSheetBorder");

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.snapToIndex(0),
    close: () => bottomSheetRef.current?.close(),
  }));

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  // Backdrop component renderer with themed color
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
        style={[props.style, { backgroundColor: backdropColor }]}
      />
    ),
    [backdropColor]
  );

  return (
    <BottomSheet
      {...props}
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      onChange={(index) => index === -1 && onClose?.()}
      backgroundStyle={{
        backgroundColor: sheetBackground,
        borderColor: borderColor,
        ...styles.bottomSheetBackgrond,
      }}
      handleIndicatorStyle={{
        backgroundColor: handleColor,
        ...styles.bottomSheetHandle,
      }}
      backdropComponent={renderBackdrop}
    >
      {children}
    </BottomSheet>
  );
});

ThemedBottomSheet.displayName = "ThemedBottomSheet";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackgrond: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
  },
});

export default ThemedBottomSheet;
