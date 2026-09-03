import { Card, Skeleton, Group, Grid, Stack, Box } from "@mantine/core";

export default function ProductCardSkeleton() {
  return (
    <Card radius="md" withBorder padding="lg">
      {/* Image Skeleton */}
      <Card.Section>
        <Skeleton height={208} radius={0} />
      </Card.Section>

      <Stack spacing="md" mt="md">
        {/* Category + Stock Badge */}
        <Group position="apart">
          <Skeleton height={12} width={70} radius="xs" />
          <Skeleton height={24} width={80} radius="xl" />
        </Group>

        {/* Product Name */}
        <Skeleton height={28} width="75%" radius="sm" />

        {/* Description (2 lines) */}
        <Stack spacing="xs">
          <Skeleton height={12} width="100%" radius="xs" />
          <Skeleton height={12} width="80%" radius="xs" />
        </Stack>

        {/* Price + Stock Grid */}
        <Box
          style={{
            borderTop: "1px solid var(--mantine-color-gray-3)",
            borderBottom: "1px solid var(--mantine-color-gray-3)",
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Grid>
            <Grid.Col span={6}>
              <Skeleton height={10} width={40} mb={6} radius="xs" />
              <Skeleton height={24} width={60} radius="sm" />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton height={10} width={40} mb={6} radius="xs" />
              <Skeleton height={24} width={40} radius="sm" />
            </Grid.Col>
          </Grid>
        </Box>

        {/* Created At */}
        <Group spacing="xs">
          <Skeleton height={16} circle />
          <Skeleton height={12} width={130} radius="xs" />
        </Group>

        {/* Action Buttons (Edit & Delete) */}
        <Group spacing="xs">
          <Skeleton height={36} width={36} radius="md" />
          <Skeleton height={36} width={36} radius="md" />
        </Group>

        {/* View Details Full Width Button */}
        <Skeleton height={44} width="100%" radius="md" />
      </Stack>
    </Card>
  );
}
