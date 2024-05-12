import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

const Profile = ({ user, loading }) => {
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [loading, user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found. <a href="/">Go back to home</a></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">{user.username}'s Profile</h1>
            <div className="border-t border-gray-200 mt-4 pt-4">
                <p>
                    Name: {user.name} {user.lastName}
                </p>
                <p>Email: {user.email}</p>
                <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params) {
        return { props: { user: null, loading: false } };
    }

    const { username } = params as ParsedUrlQuery;

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`,
            },
        });

        if (response.ok) {
            const { user } = await response.json();
            return {
                props: { user, loading: false },
            };
        } else {
            const { error } = await response.json();
            console.error('Error fetching user details:', error);
            return {
                props: { user: null, loading: false },
            };
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return {
            props: { user: null, loading: false },
        };
    }
};

export default Profile;
