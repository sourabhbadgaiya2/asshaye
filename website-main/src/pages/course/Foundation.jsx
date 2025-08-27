import React from "react";
import { Layout } from "../../layouts/Layout";
import { CoursesAllGrid } from "../../components/courses/CoursesAllGrid";
import { CoursesAllContainer } from "../../components/courses/CoursesAllContainer";
import { FoundationCategories } from "../../components/courses/FoundationCategories";

export const Foundation = () => {
  return (
    <Layout header={9} footer={1}>
      <CoursesAllGrid />
      <FoundationCategories />
    </Layout>
  );
};
