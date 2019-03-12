import React, { Component } from "react"
import { Helmet } from "react-helmet"
import qs from "qs"
import { navigate } from "gatsby"
import scrollToAnchor from "../../utils/scroll-to-anchor"
import FeaturedSites from "./featured-sites"
import FilteredShowcase from "./filtered-showcase"
import Layout from "../../components/layout"

class ShowcaseView extends Component {
  showcase = React.createRef()
  state = {
    filters: [],
  }

  componentDidMount() {
    const {
      location: { search = `` },
    } = this.props

    const { filters } = qs.parse(search.replace(`?`, ``))

    if (filters && filters.length) {
      this.setFilters(filters)
    }
  }

  componentDidUpdate() {
    const {
      location: { pathname, search },
    } = this.props
    const queryString = qs.stringify(this.state)

    if (search.replace(/^\?/, ``) !== queryString) {
      navigate(`${pathname}?${queryString}`, { replace: true })
    }
  }

  setFilters = filters => {
    this.setState({
      filters: [].concat(filters),
    })

    scrollToAnchor(this.showcase.current, () => {})()
  }

  render() {
    const { location, data } = this.props
    const { filters } = this.state

    return (
      <Layout location={location}>
        <Helmet>
          <title>Showcase</title>
        </Helmet>
        <FeaturedSites
          setFilters={this.setFilters}
          featured={data.featured.edges}
          showcase={this.showcase}
        />
        <div id="showcase" css={{ height: 0 }} ref={this.showcase} />
        <FilteredShowcase
          filters={filters}
          setFilters={this.setFilters}
          data={data}
        />
      </Layout>
    )
  }
}

export default ShowcaseView
