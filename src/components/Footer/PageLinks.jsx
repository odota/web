import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PageLinks = ({ strings }) => {
  const links = [{
    name: strings.app_about,
    path: '//blog.opendota.com/2014/08/01/faq/',
  }, {
    name: strings.app_privacy_terms,
    path: '//blog.opendota.com/2014/08/01/faq/#what-is-your-privacy-policy',
  }, {
    name: strings.app_api_docs,
    path: '//docs.opendota.com',
  }, {
    name: strings.app_blog,
    path: '//odota.github.io/blog',
  }, {
    name: strings.app_translate,
    path: '//translate.opendota.com/',
  }, {
    name: strings.app_netlify,
    path: '//www.netlify.com',
  }, {
    name: strings.app_gravitech,
    path: '//www.gravitech.io',
  }];
  return links.map(link => (
    <a href={link.path} key={link.name} target="_blank" rel="noopener noreferrer">{link.name}</a>
  ));
};

PageLinks.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PageLinks);
