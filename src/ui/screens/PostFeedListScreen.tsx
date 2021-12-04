import React from "react";
import { Virtuoso } from "react-virtuoso";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { PostItem } from "../components/PostItem";
import { ControlButtonGroup } from "../components/reusable/ControlButtonGroup";
import { EmptyListPlaceholder } from "../components/reusable/EmptyListPlaceholder";
import { HeaderContentControlsLayout } from "../components/reusable/HeaderContentControlsLayout";
import { SimpleHeader } from "../components/reusable/SimpleHeader";
import { queries } from "../FrontendFacade";

type PostFeedListScreenProps = {
  owner: AccountId;
};
export function PostFeedListScreen({ owner }: PostFeedListScreenProps) {
  const postListSize = queries.PostFeedListSize({ owner });
  return (
    <HeaderContentControlsLayout
      header={<SimpleHeader>Feed</SimpleHeader>}
      content={
        postListSize === 0 ? (
          <EmptyListPlaceholder>No posts</EmptyListPlaceholder>
        ) : (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={postListSize}
            itemContent={(index) => <PostFeedListItemMemo index={index} owner={owner} />}
          />
        )
      }
      controls={
        <ControlButtonGroup>
          <Button icon="Create" label="Create" onClick={() => alert("not implemented")} showLabel={false} />
        </ControlButtonGroup>
      }
    />
  );
}

type PostFeedListItemProps = { index: number; owner: AccountId };
function PostFeedListItem({ index, owner }: PostFeedListItemProps) {
  const id = queries.PostFeedListAtIndex({ owner, index });
  if (!id) throw new Error();
  return <PostItem viewer={owner} author={id.author} createdAt={id.createdAt} />;
}
const PostFeedListItemMemo = React.memo(PostFeedListItem);
