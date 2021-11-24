import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { changeLanguage, processLogout } from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import styles from './Header.module.scss';
import clsx from 'clsx';
import { languages } from '../../utils';
import { FormattedMessage } from 'react-intl';

function Header(props) {
    const handleChangeLanguage = (language) => {
        props.changeLanguage(language)
    }

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerTabContainer}>
                <Navigator menus={adminMenu} />
            </div>
            <div className={styles.headerTabRight}>
                <span><FormattedMessage id="header.welcome" />, {props.userInfo && props.userInfo.firstName ? props.userInfo.firstName : ''}</span>
                <div className={styles.languageOptions}>
                    <span onClick={() => handleChangeLanguage(languages.VI)} className={clsx({ [styles.active]: props.language === languages.VI })}>VI</span>
                    <span onClick={() => handleChangeLanguage(languages.EN)} className={clsx({ [styles.active]: props.language === languages.EN })}>EN</span>
                </div>
                <div className={clsx(styles.btnLogout, "btn")} onClick={props.processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(processLogout()),
        changeLanguage: (languageSelect) => dispatch(changeLanguage(languageSelect))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
