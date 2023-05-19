import React, { useState, useEffect, useRef } from 'react';
import css from './index.module.css'
interface Props<T> {
    items: T[];
    onLoadMore: () => void;
    isLoading: boolean;
    hasMore: boolean;
    renderItem: (item: T) => React.ReactNode;
}

function InfinityScroll<T>({ items, onLoadMore, isLoading, hasMore, renderItem }: Props<T>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const isScrollNearBottom = scrollTop + clientHeight >= scrollHeight - 10;
            if (isScrollNearBottom && !isLoading && hasMore && !isFetching) {
                setIsFetching(true);
            }
        };
        containerRef.current?.addEventListener('scroll', handleScroll);
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [isFetching, hasMore, isLoading]);

    useEffect(() => {
        if (isFetching) {
            onLoadMore();
            setIsFetching(false);
        }
    }, [isFetching, onLoadMore]);

    return (
        <div ref={containerRef} className={css['scroller']}>
            {items && items.map((item) => renderItem(item))}
            {isLoading && <div>Loading...</div>}
        </div>
    );
}

export default InfinityScroll;
