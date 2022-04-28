import React from 'react';
import { Helmet } from 'react-helmet';

import PostLayout from '../../../../components/PostLayout';

class PreBuilt extends React.Component {
    state = {
        mounted: false,
    };

    // TOOD: Fetch the schema and render it accordingly

    render() {
        const { location } = this.props;
        return (
            <PostLayout
                sidebar="docs"
                nestedSidebar="pipeline"
                location={location}
                post={{ title: 'Pre Built Stages' }}
            >
                <Helmet>

                </Helmet>
                {mounted ? (
                    <h1></h1>
                ) : ('Loading')}
            </PostLayout>
        )
    }
}

export default PreBuilt;