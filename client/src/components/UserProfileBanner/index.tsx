
const UserProfileBanner = () => {
    return (
            <div className="pb-5 rounded-md bg-white w-full">
                <div>
                    <img
                        className="w-full max-h-20 rounded-t-md object-cover"
                        src='https://9to5mac.com/wp-content/uploads/sites/6/2020/01/Every-Mac-wallpaper.jpeg?quality=82&strip=all'
                        alt="backdrop"
                    />
                </div>
                <div className="flex justify-center -mt-16">
                    <img
                        className="w-32 h-32 rounded-full border-2 border-white"
                        src='https://yt3.googleusercontent.com/DQKHWL4ZSGJdb_XOc3MjWQrLwDuUwdmqTp7BKahvdTYEazfp0PqRF79eaHbsCPhPyGecLjL9UsM=s900-c-k-c0x00ffffff-no-rj'
                        alt="profile"
                    />
                </div>

                <div className="items-center flex-col flex">
                    <h1 className="text-2xl font-bold ">Reuven Ostrofsky</h1>
                    <h2 className="text-lg">Software Engineer</h2>
                    <h3 className="text-lg">Montreal</h3>
                </div>
        </div>
    )};

export default UserProfileBanner;