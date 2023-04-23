import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { fetchImages } from 'services/API';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Placeholder } from '../Placeholder/Placeholder';
import css from './App.module.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isMore = images.length !== 0 && images.length < total && !loading;
  const isEmpty = images.length === 0 && !loading;

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      try {
        const searchData = await fetchImages(search, page);
        setImages(prev => [...prev, ...searchData.results]);
        setTotal(searchData.total);
      } catch {
        toast.error('Something went wrong. Please, try again');
      } finally {
        setLoading(false);
      }
    };

    if (search !== '') {
      handleFetch();
    }
  }, [page, search]);

  useEffect(() => {
    switch (total) {
      case null:
        return;

      case 0:
        toast(`We couldn't find any images matching "${search}"`);
        break;

      default:
        if (images.length !== 0) {
          toast(
            `We found ${images.length} out of ${total} images matching "${search}"`
          );
        }
        break;
    }
  }, [images.length, search, total]);

  const handleSubmit = newSearch => {
    if (search !== newSearch) {
      setSearch(newSearch);
      setPage(1);
      setImages([]);
      setTotal(null);
    } else {
      toast(
        `We've already searched for images matching "${search}".
        Please enter another request.`
      );
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />
      {isEmpty ? <Placeholder /> : <ImageGallery images={images} />}
      {loading && <Loader />}
      {isMore && <Button onLoadMore={handleLoadMore} />}
      <ToastContainer />
    </div>
  );
};
