import React from 'react';
import Search from '../components/Search';
import Content from '../components/Content';
import Pagination from '../components/Pagination';

export type Arts = {
  artist_display: string;
  title: string;
  image_id: string;
}[];

interface State {
  isLoading: boolean;
  query: string;
  arts: Arts;
  currentPage: number;
  totalPages: number;
}

class ArtsLoader extends React.Component<Record<string, never>, State> {
  state = {
    isLoading: true,
    query: localStorage.getItem('query')! ? localStorage.getItem('query')! : '',
    arts: [],
    currentPage: 1,
    totalPages: 1,
  };

  fetchArts = async () => {
    this.setState({
      isLoading: true,
    });
    const url = `https://api.artic.edu/api/v1/artworks/search?q=${this.state.query}&limit=5&page=${this.state.currentPage}&fields=artist_display,title,image_id`;
    const response = await fetch(url);
    const dataArts = await response.json();
    if (dataArts) {
      this.setState({
        arts: [...this.state.arts, ...dataArts.data],
        isLoading: false,
        totalPages: dataArts.pagination.total_pages,
      });
    }
  };

  searchByQuery = (searchQuery: string) => {
    this.setState({
      query: searchQuery,
    });
    localStorage.setItem('query', searchQuery);
  };

  changePage = (page: number) => {
    this.setState({
      currentPage: page,
    });
  };

  componentDidUpdate(
    prevProps: Readonly<Record<string, never>>,
    prevState: Readonly<State>
  ): void {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchArts();
    }
  }

  componentDidMount() {
    this.fetchArts();
    console.log('didmount');
  }

  render() {
    return (
      <>
        <Search searchByQuery={this.searchByQuery} query={this.state.query} />
        <Content arts={this.state.arts} isLoading={this.state.isLoading} />
        <Pagination
          currentPage={this.state.currentPage}
          changePage={this.changePage}
          totalPages={this.state.totalPages}
        />
      </>
    );
  }
}

export default ArtsLoader;
