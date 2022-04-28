import React from 'react';

import PostLayout from '../../../../components/PostLayout';

class PreBuilt extends React.Component {
    render() {
        const { location } = this.props;
        return (
            <PostLayout
                sidebar="docs"
                nestedSidebar="pipeline"
                location={location}
                post={{ title: 'Pre Built Stages' }}
            >
                <h1>Test</h1>
            </PostLayout>
        )
    }
}

export default PreBuilt;