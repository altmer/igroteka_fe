import React from 'react';
import PropTypes from 'prop-types';

const OpencriticTier = ({ tier }) => (
  <img
    className="OpencriticTier"
    src={`/tiers/${tier.toLowerCase()}-man.png`}
  />
);

OpencriticTier.propTypes = {
  tier: PropTypes.string.isRequired,
};

export default OpencriticTier;