import { useState, useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View, TouchableOpacity, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { images } from "../../constants";
import { getReports } from '../../lib/sb-reports';
import useSpringBackend from '../../lib/useSpringBackend';
import ReportCard from "../../components/ReportCard";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import {icons} from "../../constants";
import { defaulReportFilter, filterReports, reportsFilters } from "../../utils/report-utils";
import FilterInput from "../../components/FilterInput";

const Reports = () => {
  const context = useGlobalContext();
  
  const [filter, setFilter] = useState(defaulReportFilter)

  const { data: reports, refetch } = useSpringBackend(() => getReports(context, filter?.value || defaulReportFilter.value ));


  const [refreshing, setRefreshing] = useState(false);


  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      console.log("On callback")
      onRefresh();
    }, [])
  );

  useEffect(() => {
    console.log("On filter")
    onRefresh()
  }, [filter])


  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReportCard
            report={item}
            context={context}
          />
        )}
        
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row">
              <View>
                <Text className="font-pmedium text-sm text-secondary">
                  Welcome to
                </Text>
                <Text className="text-2xl font-psemibold text-secondary-200">
                  Reports
                </Text>
              </View>
            </View>
            <FilterInput 
              value={filter}
              setValue={(value) => {
                
                setFilter(value)
              }}
              values={reportsFilters}
              defaultValue={defaulReportFilter}
              containerStyles={" mt-5"}
            />
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Reports Found"
            subtitle="No reports created yet"
            refresh={onRefresh}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} tintColor="#6366f1" onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Reports;
