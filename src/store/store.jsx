"use client"

import { createContext, useCallback, useEffect, useState } from "react";

export const Context = createContext();


export default function ProviderContext({ children }) {


    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("favorites")) {
            localStorage.setItem("favorites", JSON.stringify([]))
        }
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleFavorite = (item) => {
        let allItems = JSON.parse(localStorage.getItem("favorites"))
        if (allItems?.some(fav => fav.slug === item.slug)) {
            const filter = allItems.filter(fav => fav.slug !== item.slug)
            setFavorites(filter);
            localStorage.setItem('favorites', JSON.stringify(filter));
        } else {
            let allItems = JSON.parse(localStorage.getItem("favorites"))
            setFavorites([...allItems, item]);
            localStorage.setItem('favorites', JSON.stringify([...allItems, item]));
        }
    };


    const [openCardId, setOpenCardId] = useState(null);

    // دالة لمعالجة النقر على زر المشاركة
    const toggleShare = useCallback((id) => {
        setOpenCardId(prevId => prevId === id ? null : id);
    }, []);

    

    return <Context.Provider value={{toggleShare , openCardId , handleFavorite , favorites}}>{children}</Context.Provider>;
}

