import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorState from "../../Components/ErrorState.jsx";
import ProductDetailsHeader from "../../Components/ProductDetailsHeader";
import ProductGallery from "../../Components/ProductGallery";
import ProductSummary from "../../Components/ProductSummary";
import ProductAttributes from "../../Components/ProductAttributes";
import { Skeleton, Grid, Paper, Stack, Group } from "@mantine/core";
import { Context } from "../../context/contextApi";
import {
  useProductDispatch,
  useProductState,
} from "../../context/productContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { getAllProducts } = useContext(Context) || {};
  const { getSpecificProduct } = useProductDispatch();
  const { specificProduct, loading, error } = useProductState();

  useEffect(() => {
    getSpecificProduct(id);
  }, [id]);

  const handleProductDeleted = () => {
    getAllProducts?.();
  };
  console.log(specificProduct);

  if (error) {
    return (
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorState />
      </motion.div>
    );
  }

  if (loading) {
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Paper className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
            <Group justify="space-between" align="center">
              <Stack gap="xs">
                <Skeleton height={28} width={240} radius="sm" />
                <Skeleton height={16} width={120} radius="sm" />
              </Stack>
              <Group gap="sm">
                <Skeleton height={36} width={90} radius="md" />
                <Skeleton height={36} width={90} radius="md" />
              </Group>
            </Group>
          </Paper>
        </motion.div>

        {/* Gallery and Summary Skeleton */}
        <motion.div
          className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Product Gallery Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Paper className="bg-surface-container-low p-4 rounded-xl border border-outline-variant space-y-4">
              <Skeleton height={380} radius="md" />
              <Group gap="sm" grow>
                <Skeleton height={70} radius="sm" />
                <Skeleton height={70} radius="sm" />
                <Skeleton height={70} radius="sm" />
                <Skeleton height={70} radius="sm" />
              </Group>
            </Paper>
          </motion.div>

          {/* Product Summary Skeleton */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Paper className="bg-surface-container-low p-6 rounded-xl border border-outline-variant space-y-5">
              <Skeleton height={24} width="70%" radius="sm" />
              <Skeleton height={32} width="35%" radius="sm" />

              <Stack gap="xs" className="py-2">
                <Skeleton height={14} width="100%" radius="sm" />
                <Skeleton height={14} width="95%" radius="sm" />
                <Skeleton height={14} width="80%" radius="sm" />
              </Stack>

              <Group gap="md">
                <Skeleton height={20} width={80} radius="xl" />
                <Skeleton height={20} width={100} radius="xl" />
              </Group>

              <Skeleton height={42} width="100%" radius="md" />
            </Paper>
          </motion.div>
        </motion.div>

        {/* Attributes Skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Paper className="bg-surface-container-low p-6 rounded-xl border border-outline-variant space-y-4">
            <Skeleton height={22} width={160} radius="sm" />
            <Grid>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid.Col span={{ base: 12, sm: 6 }} key={index}>
                  <Group
                    justify="space-between"
                    className="py-2 border-b border-outline-variant/40"
                  >
                    <Skeleton height={16} width={100} radius="sm" />
                    <Skeleton height={16} width={120} radius="sm" />
                  </Group>
                </Grid.Col>
              ))}
            </Grid>
          </Paper>
        </motion.div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ProductDetailsHeader
            product={specificProduct}
            onProductDeleted={handleProductDeleted}
          />
        </motion.div>

        {/* Gallery and Summary */}
        <motion.div
          className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <ProductGallery product={specificProduct} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <ProductSummary product={specificProduct} />
          </motion.div>
        </motion.div>

        {/* Attributes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ProductAttributes product={specificProduct} />
        </motion.div>
      </motion.div>
    );
  }
}
