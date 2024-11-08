import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Search from '@/components/Search/Search';
import UsaModeToggle from '@/components/UsaModeToggle/UsaModeToggle';
import DarkModeToggle from '@/components/DarkModeToggle/DarkModeToggle';

import lightIcon from '../../../public/assets/icons/light/menu.png';
import darkIcon from '../../../public/assets/icons/dark/menu.png';

import styles from './Menu.module.css';

const Menu = ({ handleSetCoordinates, onDarkModeChange, onUsaModeChange, darkMode, usaMode }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerStyle = darkMode ? styles.backgroundDark : styles.backgroundLight;
	const icon = darkMode ? darkIcon : lightIcon;
	const textColor = darkMode ? 'darkText' : 'lightText';

	const toggleMenu = () => setIsOpen(!isOpen);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			{isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
			<div className={`${containerStyle} ${isOpen ? styles.open : styles.closed}`}>
				<div className={styles.division}>
					<div className={styles.settings}>
						<h2 className={textColor}>Settings</h2>
						<Image src={icon} alt="Menu Icon" className={styles.iconSize} onClick={toggleMenu} priority />
					</div>
					<div className={styles.menuSpace}>
						<Search darkMode={darkMode} handleSetCoordinates={handleSetCoordinates} />
					</div>
					<UsaModeToggle onUsaModeChange={onUsaModeChange} usaMode={usaMode} darkMode={darkMode} />
					<DarkModeToggle onDarkModeChange={onDarkModeChange} darkMode={darkMode} />
				</div>
			</div>
			{!isOpen && (
				<div onClick={toggleMenu}>
					<Image src={icon} alt="Menu Icon" className={styles.iconSize} priority />
				</div>
			)}
		</>
	);
};

export default Menu;
