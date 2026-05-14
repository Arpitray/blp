
import { CurveDivider } from '@/components/shared/CurveDivider';

interface FooterWaveProps {
    topColor?: string;
}

export default function FooterWave({ topColor = '#F6FAFF' }: FooterWaveProps) {
    return (
        <div style={{ position: 'relative', zIndex: 61, pointerEvents: 'none' }}>
            <CurveDivider
                curveType="dip"
                topColor={topColor}
                bottomColor="transparent"
                hasShadow={false}
            />
        </div>
    );
}