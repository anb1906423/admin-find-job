import React from 'react'
import AnalysItem from '@/components/AnalysItem'
import { DashboardData } from '@/data/DashboardData'

const index = () => {
    return (
        <div className="dashboard container">
            <div className="row">
                {
                    DashboardData && DashboardData.map((item, index) => {
                        return (
                            <AnalysItem
                                key={index}
                                path={item.path}
                                title={item.title}
                                total={item.total}
                                average={item.average}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default index