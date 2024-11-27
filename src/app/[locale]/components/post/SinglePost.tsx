"use client"
import PostCard from "../home/postCard";
import ProfileCard from "../profile/ProfileCard";

type Props = {
    post: any,
    profile: any
};

const SinglePost = ({ post, profile }: Props) => {
    console.log("post", post);

    return <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="order-1 lg:order-1 lg:col-span-4">
            <div className="sticky top-[55px]">
                <ProfileCard profileData={profile} />
            </div>
        </div>
        <div className="order-2 lg:order-2 lg:col-span-8 -mt-3">
            <PostCard post={post.data} isOpenComment={true} isProfileCard={false} />
        </div>
    </div>;
};

export default SinglePost;
