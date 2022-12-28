import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import ImagesZoom from './imagesZoom';

const ImageWrapper = styled.div`
  display: flex !important;
  gap: 5px;
  padding: 10px;
`;

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);
  const onZoomClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  const imageStyle = useMemo(
    () => ({
      width: '130px',
      height: '130px',
      borderRadius: '8px',
    }),
    []
  );

  // 이미지가 한개
  if (images.length === 1) {
    return (
      <>
        <ImageWrapper>
          <img
            src={images[0].src}
            alt=""
            onClick={onZoom}
            style={imageStyle}
          />
        </ImageWrapper>
        {showImageZoom && (
          <ImagesZoom
            images={images}
            onClose={onZoomClose}
          />
        )}
      </>
    );
  }
  // 이미지가 두개
  else if (images.length === 2) {
    return (
      <>
        <ImageWrapper>
          <img
            src={images[0].src}
            alt=""
            onClick={onZoom}
            style={imageStyle}
          />
          <img
            src={images[1].src}
            alt=""
            onClick={onZoom}
            style={imageStyle}
          />
        </ImageWrapper>
        {showImageZoom && (
          <ImagesZoom
            images={images}
            onClose={onZoomClose}
          />
        )}
      </>
    );
  }
  // 이미지가 3개 이상
  else {
    return (
      <>
        <ImageWrapper>
          <img
            src={images[0].src}
            alt=""
            onClick={onZoom}
            style={imageStyle}
          />
          <img
            src={images[1].src}
            alt=""
            onClick={onZoom}
            style={imageStyle}
          />
          <div
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              border: '1px solid #eee',
            }}
          >
            <PlusOutlined
              style={{ fontSize: 20, color: '#ccc' }}
            />
            <br />
            {images.length - 2} 개의 사진
            <br />
            더보기
          </div>
        </ImageWrapper>
        {showImageZoom && (
          <ImagesZoom
            images={images}
            onClose={onZoomClose}
          />
        )}
      </>
    );
  }
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ).isRequired,
};
export default PostImages;
