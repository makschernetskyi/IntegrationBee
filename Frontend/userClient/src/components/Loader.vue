<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const size = 200;
const centerX = size / 2;
const centerY = size / 2;
const radius = 80;

// Rotation angle
const rotation = ref(0);

// Vertical offset to move the sine wave higher
const sineWaveOffsetY = 5; // Adjust this value as needed

// Function to rotate a point around the center
function rotatePoint(
    x: number,
    y: number,
    angle: number,
    cx: number,
    cy: number
): [number, number] {
    const rad = (Math.PI / 180) * angle;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const nx = cos * (x - cx) - sin * (y - cy) + cx;
    const ny = sin * (x - cx) + cos * (y - cy) + cy;
    return [nx, ny];
}

// Compute rotated hexagon points
const rotatedHexagonPoints = computed(() => {
    const points = [];
    const totalRotation = rotation.value + 21.51; // Updated rotation
    for (let i = 0; i < 6; i++) {
        const angle_deg = 60 * i - 90;
        const angle_rad = (Math.PI / 180) * angle_deg;
        const x = centerX + radius * Math.cos(angle_rad);
        const y = centerY + radius * Math.sin(angle_rad);

        const [nx, ny] = rotatePoint(x, y, totalRotation, centerX, centerY);
        points.push(`${nx},${ny}`);
    }
    return points.join(' ');
});

// Update rotation
onMounted(() => {
    const updateRotation = () => {
        // Adjust rotation speed here
        rotation.value = (rotation.value + 0.6) % 360;
        requestAnimationFrame(updateRotation);
    };
    updateRotation();
});

// Generate modified sine wave area path
const sineWaveAreaPath = computed(() => {
    const pathData = [];
    const amplitude = 40; // Adjust amplitude as needed
    const frequency = (2 * Math.PI) / size; // From 0 to 2π over the width
    pathData.push(`M 0 ${centerY - sineWaveOffsetY}`);

    for (let x = 0; x <= size; x += 2) {
        const y = centerY + amplitude * -0.4 * Math.sin(frequency * x) - sineWaveOffsetY;
        pathData.push(`L ${x} ${y}`);
    }

    pathData.push(`L ${size} ${size}`);
    pathData.push(`L 0 ${size}`);
    pathData.push('Z');

    return pathData.join(' ');
});

// Generate modified sine wave path for the stroke
const sineWavePath = computed(() => {
    const pathData = [];
    const amplitude = 40; // Same amplitude as the area
    const frequency = (2 * Math.PI) / size;

    pathData.push(`M 0 ${centerY + amplitude * -0.4 * Math.sin(0) - sineWaveOffsetY}`);

    for (let x = 0; x <= size; x += 2) {
        const y = centerY + amplitude * -0.4 * Math.sin(frequency * x) - sineWaveOffsetY;
        pathData.push(`L ${x} ${y}`);
    }

    return pathData.join(' ');
});
</script>

<template>
    <svg :width="size" :height="size" viewBox="0 0 200 200">
        <!-- Define the hexagon clipping path -->
        <defs>
            <clipPath id="hexagon-clip">
                <polygon :points="rotatedHexagonPoints" />
            </clipPath>
        </defs>

        <!-- Yellow area under the modified sine wave, clipped to the hexagon -->
        <g clip-path="url(#hexagon-clip)">
            <path :d="sineWaveAreaPath" fill="#FBC151" />
        </g>

        <!-- Draw the modified sine curve -->
        <path :d="sineWavePath" stroke="#242424" stroke-width="10" fill="none" />

        <!-- Rotating hexagon outline -->
        <polygon
            :points="rotatedHexagonPoints"
            stroke="#242424"
            stroke-width="10"
            fill="none"
        />
    </svg>
</template>

<style scoped>
svg {
    display: block;
}
</style>
