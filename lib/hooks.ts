import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'

// Gunakan custom hooks ini di seluruh komponen client Anda untuk menjamin type-safety
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector)
export const useAppStore = () => useStore<AppStore>()
