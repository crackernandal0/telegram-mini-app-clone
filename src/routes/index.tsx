import { Route, Routes } from "react-router-dom";
import { Statics } from "@/pages/statics";
import { Home } from "@/pages/home";
import { Socials } from "@/pages/socials";
import { ShoppingBag } from "@/pages/shopping-bag";

import { RootLayout } from "@/pages/layouts/default";

import { Tasks } from "@/pages/tasks";
import { Videos } from "@/pages/videos";
import { Splash } from "@/pages/splash";
import { Invites } from "@/pages/invites";
import { Lottery } from "@/pages/lottery";
import CardGrid from "@/pages/cards";
import NeedHome from "@/pages/home2";


export function RoutesProvider() {
  return (
    <Routes>
      <Route element={<Splash />} path="/" />
      <Route element={<Home />} path="/home" />
      <Route element={<Statics />} path="/static" />

      <Route element={<RootLayout />} path="/">
        <Route element={<Socials />} path="/socials" />
        <Route element={<Videos />} path="/videos" />
        <Route element={<Tasks />} path="/tasks" />
      </Route>

      <Route element={<Invites />} path="/invites" />
      <Route element={<ShoppingBag />} path="/bag" />
      <Route element={<Lottery />} path="/lottery" />
      <Route element={<CardGrid />} path="/card" />
      <Route element={<NeedHome />} path="/home2" />

    </Routes>
  );
}
