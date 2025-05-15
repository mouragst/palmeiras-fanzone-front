import React from "react";
import Matches from "../../components/Matches";
import {
  Layout
} from '@/components/Layout';

const MatchesPage: React.FC = () => {
  return (
    <Layout>
        <Matches />
    </Layout>
  );
};

export default MatchesPage;