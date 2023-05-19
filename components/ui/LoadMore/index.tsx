import { EStatus, loadNextPage } from "@/lib/get-func";
import { loadNextPageSnapshot } from "@/lib/snapshort-func";
import { useAppSelector } from "@/store/hook";
import React from "react";

type ICollection = "matches" | "";

interface LoadMoreProps<T> {
  initialData: T[];
  onReceivedData?: (data: T[]) => void;
  customLoadMore?: () => void;
  render: (
    values: T[],
    handleScroll: (event: React.UIEvent<HTMLElement>) => void
  ) => React.ReactElement | null;
  status?: EStatus;
}

interface FirebaseProps<T> extends LoadMoreProps<T> {
  collection: ICollection;
  initialLastVisible: T;
}

interface ArrayProps<T> extends LoadMoreProps<T> {}
type TScroll = "Firebase" | "Array";

type TProps<T> = {
  typeScroll: TScroll;
} & (FirebaseProps<T> | ArrayProps<T>);

function LoadMore<T>(props: TProps<T>): React.ReactElement | null {
  const { typeScroll } = props;

  if (typeScroll === "Firebase") {
    const firebaseProps = props as FirebaseProps<T>;
    const {
      collection,
      initialData,
      initialLastVisible,
      onReceivedData,
      render,
      status,
    } = firebaseProps;
    const [data, setData] = React.useState<T[]>(initialData);
    const [lastData, setLastData] = React.useState<T>(initialLastVisible);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMoreData, setHasMoreData] = React.useState(true);
    const { category } = useAppSelector((state) => state.categorySlice);
    const load = React.useCallback(async () => {
      if (isLoading || !hasMoreData) return;
      setIsLoading(true);

      try {
        const { data: newData, lastVisible } = await loadNextPage(
          collection,
          category.id,
          lastData ?? (initialLastVisible as any),
          status!
        );

        setData((prevData) => [...prevData, ...newData] as T[]);
        setLastData(lastVisible as T);
        setHasMoreData(newData ? initialData.length > 0 : false);
        onReceivedData?.(newData as T[]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, [
      collection,
      initialData,
      lastData,
      isLoading,
      hasMoreData,
      status,
      onReceivedData,
    ]);
    const handleScroll = React.useCallback(
      (event: React.UIEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const scrollBottom =
          target.scrollHeight - target.scrollTop - target.clientHeight;
        if (scrollBottom <= 10 && !isLoading) {
          load();
        }
      },
      [load]
    );
    return render(data, handleScroll);
  } else {
    const arrayProps = props as ArrayProps<T>;
    const { initialData, render } = arrayProps;
    const [visibleItems, setVisibleItems] = React.useState<T[]>(
      initialData?.slice(0, 10)
    );

    const handleLoadMore = () => {
      setVisibleItems((prevVisibleItems) => {
        const nextIndex = prevVisibleItems.length + 10;
        return [
          ...prevVisibleItems,
          ...initialData.slice(prevVisibleItems.length, nextIndex),
        ];
      });
    };

    const handleScroll = React.useCallback(
      (event: React.UIEvent<HTMLElement>) => {
        const target = event.target as HTMLElement;
        const scrollBottom =
          target.scrollHeight - target.scrollTop - target.clientHeight;
        if (scrollBottom <= 10) {
          handleLoadMore();
        }
      },
      [handleLoadMore]
    );

    return render(visibleItems!, handleScroll);
  }
}

export default LoadMore;
