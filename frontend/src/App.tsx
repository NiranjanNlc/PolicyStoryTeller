import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppProvider } from "./context/AppContext";
import { BillOverviewScreen } from "./screens/BillOverviewScreen";
import { BillSelectionScreen } from "./screens/BillSelectionScreen";
import { StoryScreen } from "./screens/StoryScreen";
import { VoteScreen } from "./screens/VoteScreen";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<BillSelectionScreen />} />
            <Route path="bill/:billId" element={<BillOverviewScreen />} />
            <Route path="bill/:billId/story" element={<StoryScreen />} />
            <Route path="bill/:billId/vote" element={<VoteScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
