import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Input from '@/components/Input'
import * as Icons from 'phosphor-react-native'
import { router, useRouter } from 'expo-router'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import Button from '@/components/Button'

export default function forgot() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);

    const forgotRef = React.useRef('');
    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.back();
        }, 800);
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/*back button */}
                <BackButton iconSize={28}></BackButton>
                <View style={{ gap: 5, marginTop: spacingY._20, marginBottom: -50 }}>
                    <Typo size={30} fontWeight={"800"}>Reset your Password</Typo>
                </View>
                <Animated.Image
                    entering={FadeIn.duration(1000)}
                    style={styles.forgotImage}
                    resizeMode="contain"
                    source={require('../../assets/images/forgot.png')}></Animated.Image>

                <View style={styles.form}>
                    <Input
                        placeholder='Enter your email'
                        onChangeText={value => forgotRef.current = value}
                        icon={<Icons.At size={verticalScale(26)} color={colors.neutral300}
                            weight='fill'
                        ></Icons.At>}
                    />
                    <Button loading={isLoading} onPress={handleSubmit} >
                        <Typo fontWeight={'700'} color={colors.black} size={21}>Reset</Typo>
                    </Button>
                </View>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: spacingY._30,
        paddingHorizontal: spacingX._20,
    },
    forgotImage: {
        width: "100%",
        height: verticalScale(300),
        alignSelf: "center",
        marginTop: verticalScale(100),
    },
    welcomeText: {
        fontSize: verticalScale(20),
        fontWeight: "bold",
        color: colors.text
    },
    form:{
        gap:spacingY._20,
    }
})