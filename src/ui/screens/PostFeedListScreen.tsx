import React from "react";
import { Virtuoso } from "react-virtuoso";
import { AccountId } from "../../domain/common/AccountId";
import { Button } from "../components/base/Button";
import { Clickable } from "../components/base/Clickable";
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
            itemContent={(index) => <PostListItem index={index} owner={owner} />}
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

type PostListItemProps = { index: number; owner: AccountId };
function PostListItem({ index, owner }: PostListItemProps) {
  const id = queries.PostFeedListAtIndex({ owner, index });
  if (!id) throw new Error();
  return (
    <Clickable onClick={() => alert("not implemted")}>
      <PostItem viewer={owner} author={id.author} createdAt={id.createdAt} />
    </Clickable>
  );
}
