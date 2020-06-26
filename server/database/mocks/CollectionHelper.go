// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import context "context"
import database "github.com/matthew-j-welte/bit-board/server/database"
import mock "github.com/stretchr/testify/mock"
import primitive "go.mongodb.org/mongo-driver/bson/primitive"

// CollectionHelper is an autogenerated mock type for the CollectionHelper type
type CollectionHelper struct {
	mock.Mock
}

// CountAllRecords provides a mock function with given fields:
func (_m *CollectionHelper) CountAllRecords() (int64, error) {
	ret := _m.Called()

	var r0 int64
	if rf, ok := ret.Get(0).(func() int64); ok {
		r0 = rf()
	} else {
		r0 = ret.Get(0).(int64)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func() error); ok {
		r1 = rf()
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// CountRecords provides a mock function with given fields: filter
func (_m *CollectionHelper) CountRecords(filter interface{}) (int64, error) {
	ret := _m.Called(filter)

	var r0 int64
	if rf, ok := ret.Get(0).(func(interface{}) int64); ok {
		r0 = rf(filter)
	} else {
		r0 = ret.Get(0).(int64)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(interface{}) error); ok {
		r1 = rf(filter)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DecrementField provides a mock function with given fields: primaryID, fieldName
func (_m *CollectionHelper) DecrementField(primaryID string, fieldName string) (int, error) {
	ret := _m.Called(primaryID, fieldName)

	var r0 int
	if rf, ok := ret.Get(0).(func(string, string) int); ok {
		r0 = rf(primaryID, fieldName)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string) error); ok {
		r1 = rf(primaryID, fieldName)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DecrementFieldInObjectArray provides a mock function with given fields: primaryID, arrName, arrayElementID, arrayObjectField
func (_m *CollectionHelper) DecrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	ret := _m.Called(primaryID, arrName, arrayElementID, arrayObjectField)

	var r0 int
	if rf, ok := ret.Get(0).(func(string, string, string, string) int); ok {
		r0 = rf(primaryID, arrName, arrayElementID, arrayObjectField)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string, string, string) error); ok {
		r1 = rf(primaryID, arrName, arrayElementID, arrayObjectField)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// DeleteOne provides a mock function with given fields: ctx, filter
func (_m *CollectionHelper) DeleteOne(ctx context.Context, filter interface{}) (int64, error) {
	ret := _m.Called(ctx, filter)

	var r0 int64
	if rf, ok := ret.Get(0).(func(context.Context, interface{}) int64); ok {
		r0 = rf(ctx, filter)
	} else {
		r0 = ret.Get(0).(int64)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, interface{}) error); ok {
		r1 = rf(ctx, filter)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// Find provides a mock function with given fields: _a0, _a1, _a2
func (_m *CollectionHelper) Find(_a0 context.Context, _a1 interface{}, _a2 interface{}) (database.ManyResultsHelper, error) {
	ret := _m.Called(_a0, _a1, _a2)

	var r0 database.ManyResultsHelper
	if rf, ok := ret.Get(0).(func(context.Context, interface{}, interface{}) database.ManyResultsHelper); ok {
		r0 = rf(_a0, _a1, _a2)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(database.ManyResultsHelper)
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, interface{}, interface{}) error); ok {
		r1 = rf(_a0, _a1, _a2)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// FindOne provides a mock function with given fields: _a0, _a1, _a2
func (_m *CollectionHelper) FindOne(_a0 context.Context, _a1 interface{}, _a2 interface{}) database.SingleResultHelper {
	ret := _m.Called(_a0, _a1, _a2)

	var r0 database.SingleResultHelper
	if rf, ok := ret.Get(0).(func(context.Context, interface{}, interface{}) database.SingleResultHelper); ok {
		r0 = rf(_a0, _a1, _a2)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(database.SingleResultHelper)
		}
	}

	return r0
}

// GetInsertID provides a mock function with given fields: result
func (_m *CollectionHelper) GetInsertID(result interface{}) string {
	ret := _m.Called(result)

	var r0 string
	if rf, ok := ret.Get(0).(func(interface{}) string); ok {
		r0 = rf(result)
	} else {
		r0 = ret.Get(0).(string)
	}

	return r0
}

// GetModifiedCount provides a mock function with given fields: result
func (_m *CollectionHelper) GetModifiedCount(result interface{}) int64 {
	ret := _m.Called(result)

	var r0 int64
	if rf, ok := ret.Get(0).(func(interface{}) int64); ok {
		r0 = rf(result)
	} else {
		r0 = ret.Get(0).(int64)
	}

	return r0
}

// GetObjectIDFromFilter provides a mock function with given fields: identifier
func (_m *CollectionHelper) GetObjectIDFromFilter(identifier primitive.M) (string, error) {
	ret := _m.Called(identifier)

	var r0 string
	if rf, ok := ret.Get(0).(func(primitive.M) string); ok {
		r0 = rf(identifier)
	} else {
		r0 = ret.Get(0).(string)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(primitive.M) error); ok {
		r1 = rf(identifier)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// GetSubArray provides a mock function with given fields: primaryID, arrayName
func (_m *CollectionHelper) GetSubArray(primaryID string, arrayName string) (interface{}, error) {
	ret := _m.Called(primaryID, arrayName)

	var r0 interface{}
	if rf, ok := ret.Get(0).(func(string, string) interface{}); ok {
		r0 = rf(primaryID, arrayName)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(interface{})
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string) error); ok {
		r1 = rf(primaryID, arrayName)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// IncrementField provides a mock function with given fields: primaryID, fieldName
func (_m *CollectionHelper) IncrementField(primaryID string, fieldName string) (int, error) {
	ret := _m.Called(primaryID, fieldName)

	var r0 int
	if rf, ok := ret.Get(0).(func(string, string) int); ok {
		r0 = rf(primaryID, fieldName)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string) error); ok {
		r1 = rf(primaryID, fieldName)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// IncrementFieldInObjectArray provides a mock function with given fields: primaryID, arrName, arrayElementID, arrayObjectField
func (_m *CollectionHelper) IncrementFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string) (int, error) {
	ret := _m.Called(primaryID, arrName, arrayElementID, arrayObjectField)

	var r0 int
	if rf, ok := ret.Get(0).(func(string, string, string, string) int); ok {
		r0 = rf(primaryID, arrName, arrayElementID, arrayObjectField)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string, string, string) error); ok {
		r1 = rf(primaryID, arrName, arrayElementID, arrayObjectField)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// InsertOne provides a mock function with given fields: _a0, _a1
func (_m *CollectionHelper) InsertOne(_a0 context.Context, _a1 interface{}) (interface{}, error) {
	ret := _m.Called(_a0, _a1)

	var r0 interface{}
	if rf, ok := ret.Get(0).(func(context.Context, interface{}) interface{}); ok {
		r0 = rf(_a0, _a1)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(interface{})
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, interface{}) error); ok {
		r1 = rf(_a0, _a1)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// PushToArray provides a mock function with given fields: primaryID, arrayName, payload
func (_m *CollectionHelper) PushToArray(primaryID string, arrayName string, payload interface{}) (interface{}, error) {
	ret := _m.Called(primaryID, arrayName, payload)

	var r0 interface{}
	if rf, ok := ret.Get(0).(func(string, string, interface{}) interface{}); ok {
		r0 = rf(primaryID, arrayName, payload)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(interface{})
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string, interface{}) error); ok {
		r1 = rf(primaryID, arrayName, payload)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateCountFieldInObjectArray provides a mock function with given fields: primaryID, arrName, arrayElementID, arrayObjectField, val
func (_m *CollectionHelper) UpdateCountFieldInObjectArray(primaryID string, arrName string, arrayElementID string, arrayObjectField string, val int) (int, error) {
	ret := _m.Called(primaryID, arrName, arrayElementID, arrayObjectField, val)

	var r0 int
	if rf, ok := ret.Get(0).(func(string, string, string, string, int) int); ok {
		r0 = rf(primaryID, arrName, arrayElementID, arrayObjectField, val)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string, string, string, int) error); ok {
		r1 = rf(primaryID, arrName, arrayElementID, arrayObjectField, val)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateFieldCount provides a mock function with given fields: primaryID, fieldName, amount
func (_m *CollectionHelper) UpdateFieldCount(primaryID string, fieldName string, amount int) (int, error) {
	ret := _m.Called(primaryID, fieldName, amount)

	var r0 int
	if rf, ok := ret.Get(0).(func(string, string, int) int); ok {
		r0 = rf(primaryID, fieldName, amount)
	} else {
		r0 = ret.Get(0).(int)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(string, string, int) error); ok {
		r1 = rf(primaryID, fieldName, amount)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// UpdateOne provides a mock function with given fields: ctx, filter, projection
func (_m *CollectionHelper) UpdateOne(ctx context.Context, filter interface{}, projection interface{}) (interface{}, error) {
	ret := _m.Called(ctx, filter, projection)

	var r0 interface{}
	if rf, ok := ret.Get(0).(func(context.Context, interface{}, interface{}) interface{}); ok {
		r0 = rf(ctx, filter, projection)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(interface{})
		}
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(context.Context, interface{}, interface{}) error); ok {
		r1 = rf(ctx, filter, projection)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}
