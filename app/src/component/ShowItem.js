/**
 * author: liminjie
 * date: 2017/3/30
 * desc: 正在热映的Item
 */

'use strict';

import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../style/Styles";

export default class ShowItem extends Component {

    render() {
        const movie = this.props.movie.item;
        const img = movie.img;//电影海报
        if (img.toString() == ""){
            return(<View/>);
        }
        const title = movie.tCn;//电影中文名
        const rank = movie.r;//评分
        const special = movie.commonSpecial;//一句话评价
        const raiseDate = movie.rd;//上映时间
        const cinemaCount = movie.cC;//上映电影院数
        const showtimeCount = movie.NearestShowtimeCount;//上映场数
        const versions = movie.versions;//观影标签
        const ticketing = movie.isTicket;//售票

        return (
            <TouchableOpacity onPress={this._onPressToDetail}>
                <View style={styles.container}>
                    <Image source={{uri: img}} style={styles.img}/>
                    <View style={styles.detail}>
                        <View style={styles.detail_title}>
                            <Text style={styles.text_title}>{title}  </Text>
                            <Text style={styles.text_rank}>{rank}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{
                                width: 20,
                                height: 20,
                                textAlign: 'center',
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#ff8601'
                            }}>“</Text>
                            <Text style={styles.text_special}>{special}</Text>
                        </View>
                        <Text
                            style={styles.text_date_cinema}>{raiseDate.substring(4, 6) * 1}月{raiseDate.substring(6, 8)}日上映</Text>
                        <Text style={styles.text_date_cinema}>今日{cinemaCount}家影院上映{showtimeCount}场</Text>

                        <View style={{flex: 1, flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center'}}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <Text
                                    style={[styles.text_version, {borderColor: ShowItem.checkVersion(versions[0]) ? '#999999' : '#E9E9EF',}]}>{ShowItem.getVersion(versions[0])}</Text>
                                <Text
                                    style={[styles.text_version, {borderColor: ShowItem.checkVersion(versions[1]) ? '#999999' : '#E9E9EF',}]}>{ShowItem.getVersion(versions[1])}</Text>
                                <Text
                                    style={[styles.text_version, {borderColor: ShowItem.checkVersion(versions[2]) ? '#999999' : '#E9E9EF',}]}>{ShowItem.getVersion(versions[2])}</Text>
                            </View>
                            {this._renderButton(ticketing)}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _renderButton(isTicket) {
        if (isTicket) {
            return (
                <TouchableOpacity style={{
                    alignSelf: 'flex-end',
                    borderRadius: 2,
                    borderColor: '#639e02',
                    borderWidth: 1,
                    width: 50,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#639e02', fontSize: 12}}>预售</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={{
                    alignSelf: 'flex-end',
                    borderRadius: 2,
                    borderColor: '#ff8601',
                    borderWidth: 1,
                    width: 50,
                    height: 25,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{color: '#ff8601', fontSize: 12}}>购票</Text>
                </TouchableOpacity>
            );
        }
    }

    /**
     * 得到标签
     * @param versions
     * @returns {string}
     */
    static getVersion(versions) {
        if (versions instanceof Object) {
            return versions.version;
        } else {
            return "";
        }
    }

    /**
     * 检查是否存在标签
     * @param versions
     * @returns {boolean}
     */
    static checkVersion(versions) {
        return versions instanceof Object;
    }

    /**
     * 得到购票状态
     * @param ticketing
     * @returns {string}
     */
    static getTicking(ticketing) {
        return ticketing ? "购票" : "预售";
    }

    _onPressToDetail = () => {
        const movie = this.props.movie.item;
        const movieId = movie.id.toString();
        this.props.navigation.navigate('Detail', {movieId: movieId});
    };

    _onPressToTicket = () => {
        this.props.navigation.navigate('Detail', {name: 'ticket'});
    };
}
