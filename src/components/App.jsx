import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchImages } from 'api/images';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImageURL, setModalImageURL] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      setShowLoader(true);
      setShowErrorMessage(false);
      try {
        const searchData = await fetchImages(searchQuery, page);
        if (searchData.totalHits === 0) {
          setShowErrorMessage(true);
        }
        setImages(prevImages => [
          ...prevImages,
          ...searchData.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          ),
        ]);
      } catch (error) {
        setError(error);
      } finally {
        setShowLoader(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    };
    if (searchQuery !== '') {
      getImages();
    }
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setSearchQuery(query);
      setImages([]);
      setPage(1);
      setShowErrorMessage(false);
    }
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onImageClick = (largeImageURL, tags) => {
    setModalImageURL({ largeImageURL, tags });
    toggleModal();
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {showErrorMessage && <ErrorMessage searchQuery={searchQuery} />}
      {images.length !== 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {showLoader && <Loader />}
      {images.length > 0 && !showLoader && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal onClose={toggleModal} modalImageURL={modalImageURL} />
      )}
    </>
  );
}

export default App;
