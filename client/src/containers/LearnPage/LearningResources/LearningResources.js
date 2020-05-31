

const LearningResources = (props) => {
    const renderResourceRow = (resource) => {
        if (resource["type"] === "videos"){
          return <VideoLearningResourceRow {...resource}/>
        }
        else {
          return <ReadingLearningResourceRow {...resource}/>
        }
      }
    
    const genResources = () => {
      return this.state.resources[this.state.activeResourceTypeTab]
      .map(resource => {
        return this.renderResourceRow(resource)
      });
    }

    
}