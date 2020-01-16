//
//  FxVector.h
//
//  Created by joli on 2018/12/19.
//  Copyright © 2018 uzone. All rights reserved.
//

#ifndef FxVector_hpp
#define FxVector_hpp

#include "flashx/element/FxUnit.h"
#include <vector>

NS_FLASHX_BEGIN

template<class T>
class FxVector
{
public:
    /** Iterator, can be used to loop the FxVector. */
    typedef typename std::vector<T>::iterator iterator;
    /** Const iterator, can be used to loop the FxVector. */
    typedef typename std::vector<T>::const_iterator const_iterator;
    
    /** Reversed iterator, can be used to loop the FxVector in reverse sequence. */
    typedef typename std::vector<T>::reverse_iterator reverse_iterator;
    /** Reversed iterator, can be used to loop the FxVector in reverse sequence. */
    typedef typename std::vector<T>::const_reverse_iterator const_reverse_iterator;
    
    /** Returns an iterator pointing the first element of the FxVector. */
    iterator begin() { return _data.begin(); }
    /** Returns an iterator pointing the first element of the FxVector. */
    const_iterator begin() const { return _data.begin(); }
    
    /**
     * Returns an iterator referring to the `past-the-end` element in the FxVector container.
     * The past-the-end element is the theoretical element that would follow the last element in the FxVector.
     * It does not point to any element, and thus shall not be dereferenced.
     */
    iterator end() { return _data.end(); }
    /**
     * Returns iterator referring to the `past-the-end` element in the FxVector container.
     * The past-the-end element is the theoretical element that would follow the last element in the FxVector.
     * It does not point to any element, and thus shall not be dereferenced.
     */
    const_iterator end() const { return _data.end(); }
    
    /** Returns a const_iterator pointing the first element of the FxVector. */
    const_iterator cbegin() const { return _data.cbegin(); }
    /** Returns a const_iterator pointing the `past-the-end` element of the FxVector. */
    const_iterator cend() const { return _data.cend(); }
    
    /** Returns a reverse iterator pointing to the last element of the FxVector. */
    reverse_iterator rbegin() { return _data.rbegin(); }
    /** Returns a reverse iterator pointing to the last element of the FxVector. */
    const_reverse_iterator rbegin() const { return _data.rbegin(); }
    
    /** Returns a reverse iterator pointing to the theoretical element preceding the
     * first element of the vector (which is considered its reverse end).
     */
    reverse_iterator rend() { return _data.rend(); }
    /** Returns a reverse iterator pointing to the theoretical element preceding the
     * first element of the vector (which is considered its reverse end).
     */
    const_reverse_iterator rend() const { return _data.rend(); }
    
    /** Returns a const_reverse_iterator pointing to the last element in the container (i.e., its reverse beginning). */
    const_reverse_iterator crbegin() const { return _data.crbegin(); }
    /** Returns a const_reverse_iterator pointing to the theoretical element preceding the first element in
     * the container (which is considered its reverse end).
     */
    const_reverse_iterator crend() const { return _data.crend(); }
    
    /** Constructor. */
    FxVector<T>() : _data()
    {
        static_assert(std::is_convertible<T, FxUnit*>::value, "Invalid Type for cocos2d::FxVector<T>!");
    }
    
    /**
     * Constructor with a capacity.
     * @param capacity Capacity of the FxVector.
     */
    explicit FxVector<T>(ssize_t capacity) : _data()
    {
        static_assert(std::is_convertible<T, FxUnit*>::value, "Invalid Type for cocos2d::FxVector<T>!");
        FXLOG("In the default constructor with capacity of FxVector.");
        reserve(capacity);
    }
    
    /** Destructor. */
    ~FxVector<T>()
    {
        FXLOG("In the destructor of FxVector.");
        clear();
    }
    
    /** Copy constructor. */
    FxVector<T>(const FxVector<T>& other)
    {
        static_assert(std::is_convertible<T, FxUnit*>::value, "Invalid Type for cocos2d::FxVector<T>!");
        FXLOG("In the copy constructor!");
        _data = other._data;
        addRefForAllObjects();
    }
    
    /** Constructor with std::move semantic. */
    FxVector<T>(FxVector<T>&& other)
    {
        static_assert(std::is_convertible<T, FxUnit*>::value, "Invalid Type for cocos2d::FxVector<T>!");
        FXLOG("In the move constructor of FxVector!");
        _data = std::move(other._data);
    }
    
    /** Copy assignment operator. */
    FxVector<T>& operator=(const FxVector<T>& other)
    {
        if (this != &other) {
            FXLOG("In the copy assignment operator!");
            clear();
            _data = other._data;
            addRefForAllObjects();
        }
        return *this;
    }
    
    /** Copy assignment operator with std::move semantic. */
    FxVector<T>& operator=(FxVector<T>&& other)
    {
        if (this != &other) {
            FXLOG("In the move assignment operator!");
            clear();
            _data = std::move(other._data);
        }
        return *this;
    }
    
    // Don't uses operator since we could not decide whether it needs 'retain'/'release'.
    //    T& operator[](int index)
    //    {
    //        return _data[index];
    //    }
    //
    //    const T& operator[](int index) const
    //    {
    //        return _data[index];
    //    }
    
    /**
     * Requests that the vector capacity be at least enough to contain n elements.
     * @param capacity Minimum capacity requested of the FxVector.
     */
    void reserve(ssize_t n)
    {
        _data.reserve(n);
    }
    
    /** @brief Returns the size of the storage space currently allocated for the FxVector, expressed in terms of elements.
     *  @note This capacity is not necessarily equal to the FxVector size.
     *        It can be equal or greater, with the extra space allowing to accommodate for growth without the need to reallocate on each insertion.
     *  @return The size of the currently allocated storage capacity in the FxVector, measured in terms of the number elements it can hold.
     */
    ssize_t capacity() const
    {
        return _data.capacity();
    }
    
    /** @brief Returns the number of elements in the FxVector.
     *  @note This is the number of actual objects held in the FxVector, which is not necessarily equal to its storage capacity.
     *  @return The number of elements in the FxVector.
     */
    ssize_t size() const
    {
        return  _data.size();
    }
    
    /** @brief Returns whether the FxVector is empty (i.e. whether its size is 0).
     *  @note This function does not modify the container in any way. To clear the content of a vector, see FxVector<T>::clear.
     */
    bool empty() const
    {
        return _data.empty();
    }
    
    /** Returns the maximum number of elements that the FxVector can hold. */
    ssize_t max_size() const
    {
        return _data.max_size();
    }
    
    /** Returns index of a certain object, return UINT_MAX if doesn't contain the object */
    ssize_t getIndex(T object) const
    {
        auto iter = std::find(_data.begin(), _data.end(), object);
        if (iter != _data.end())
            return iter - _data.begin();
        
        return -1;
    }
    
    /** @brief Find the object in the FxVector.
     *  @param object The object to find.
     *  @return Returns an iterator which refers to the element that its value is equals to object.
     *          Returns FxVector::end() if not found.
     */
    const_iterator find(T object) const
    {
        return std::find(_data.begin(), _data.end(), object);
    }
    
    /** @brief Find the object in the FxVector.
     *  @param object The object to find.
     *  @return Returns an iterator which refers to the element that its value is equals to object.
     *          Returns FxVector::end() if not found.
     */
    iterator find(T object)
    {
        return std::find(_data.begin(), _data.end(), object);
    }
    
    /** Returns the element at position 'index' in the FxVector. */
    T at(ssize_t index) const
    {
        FX_ASSERT( index >= 0 && index < size(), "index out of range in getObjectAtIndex()");
        return _data[index];
    }
    
    /** Returns the first element in the FxVector. */
    T front() const
    {
        return _data.front();
    }
    
    /** Returns the last element of the FxVector. */
    T back() const
    {
        return _data.back();
    }
    
    /** Returns a random element of the FxVector. */
    T getRandomObject() const
    {
        if (!_data.empty())
        {
            ssize_t randIdx = rand() % _data.size();
            return *(_data.begin() + randIdx);
        }
        return nullptr;
    }
    
    /**
     * Checks whether an object is in the container.
     * @param object The object to be checked.
     * @return True if the object is in the container, false if not.
     */
    bool contains(T object) const
    {
        return( std::find(_data.begin(), _data.end(), object) != _data.end() );
    }
    
    /**
     * Checks whether two vectors are equal.
     * @param other The vector to be compared.
     * @return True if two vectors are equal, false if not.
     */
    bool equals(const FxVector<T> &other)
    {
        ssize_t s = this->size();
        if (s != other.size())
            return false;
        
        for (ssize_t i = 0; i < s; i++)
        {
            if (this->at(i) != other.at(i))
            {
                return false;
            }
        }
        return true;
    }
    
    // Adds objects
    
    /** Adds a new element at the end of the FxVector. */
    void pushBack(T object)
    {
        FX_ASSERT(object != nullptr, "The object should not be nullptr");
        _data.push_back( object );
        object->retain();
    }
    
    /** Push all elements of an existing FxVector to the end of current FxVector. */
    void pushBack(const FxVector<T>& other)
    {
        for(const auto &obj : other) {
            _data.push_back(obj);
            obj->retain();
        }
    }
    
    /**
     * Insert an object at certain index.
     * @param index The index to be inserted at.
     * @param object The object to be inserted.
     */
    void insert(ssize_t index, T object)
    {
		FX_ASSERT(index >= 0 && index <= size(), "Invalid index!");
		FX_ASSERT(object != nullptr, "The object should not be nullptr");
        _data.insert((std::begin(_data) + index), object);
        object->retain();
    }
    
    // Removes Objects
    
    /** Removes the last element in the FxVector. */
    void popBack()
    {
		FX_ASSERT(!_data.empty(), "no objects added");
        auto last = _data.back();
        _data.pop_back();
        last->release();
    }
    
    /** Remove a certain object in FxVector.
     *  @param object The object to be removed.
     *  @param removeAll Whether to remove all elements with the same value.
     *                   If its value is 'false', it will just erase the first occurrence.
     */
    void eraseObject(T object, bool removeAll = false)
    {
		FX_ASSERT(object != nullptr, "The object should not be nullptr");
        
        if (removeAll)
        {
            for (auto iter = _data.begin(); iter != _data.end();)
            {
                if ((*iter) == object)
                {
                    iter = _data.erase(iter);
                    object->release();
                }
                else
                {
                    ++iter;
                }
            }
        }
        else
        {
            auto iter = std::find(_data.begin(), _data.end(), object);
            if (iter != _data.end())
            {
                _data.erase(iter);
                object->release();
            }
        }
    }
    
    /** @brief Removes from the vector with an iterator.
     *  @param position Iterator pointing to a single element to be removed from the FxVector.
     *  @return An iterator pointing to the new location of the element that followed the last element erased by the function call.
     *          This is the container end if the operation erased the last element in the sequence.
     */
    iterator erase(iterator position)
    {
		FX_ASSERT(position >= _data.begin() && position < _data.end(), "Invalid position!");
        (*position)->release();
        return _data.erase(position);
    }
    
    /** @brief Removes from the FxVector with a range of elements (  [first, last)  ).
     *  @param first The beginning of the range.
     *  @param last The end of the range, the 'last' will not be removed, it's only for indicating the end of range.
     *  @return An iterator pointing to the new location of the element that followed the last element erased by the function call.
     *          This is the container end if the operation erased the last element in the sequence.
     */
    iterator erase(iterator first, iterator last)
    {
        for (auto iter = first; iter != last; ++iter)
        {
            (*iter)->release();
        }
        
        return _data.erase(first, last);
    }
    
    /** @brief Removes from the FxVector by index.
     *  @param index The index of the element to be removed from the FxVector.
     *  @return An iterator pointing to the successor of FxVector[index].
     */
    iterator erase(ssize_t index)
    {
		FX_ASSERT(!_data.empty() && index >=0 && index < size(), "Invalid index!");
        auto it = std::next( begin(), index );
        (*it)->release();
        return _data.erase(it);
    }
    
    /** @brief Removes all elements from the FxVector (which are destroyed), leaving the container with a size of 0.
     *  @note All the elements in the FxVector will be released (reference count will be decreased).
     */
    void clear()
    {
        for( auto it = std::begin(_data); it != std::end(_data); ++it ) {
            (*it)->release();
        }
        _data.clear();
    }
    
    // Rearranging Content
    
    /** Swap the values object1 and object2. */
    void swap(T object1, T object2)
    {
        ssize_t idx1 = getIndex(object1);
        ssize_t idx2 = getIndex(object2);
        
		FX_ASSERT(idx1>=0 && idx2>=0, "invalid object index");
        
        std::swap( _data[idx1], _data[idx2] );
    }
    
    /** Swap two elements by indexes. */
    void swap(ssize_t index1, ssize_t index2)
    {
		FX_ASSERT(index1 >=0 && index1 < size() && index2 >= 0 && index2 < size(), "Invalid indices");
        
        std::swap( _data[index1], _data[index2] );
    }
    
    /** Replace value at index with given object. */
    void replace(ssize_t index, T object)
    {
		FX_ASSERT(index >= 0 && index < size(), "Invalid index!");
		FX_ASSERT(object != nullptr, "The object should not be nullptr");
        
        _data[index]->release();
        _data[index] = object;
        object->retain();
    }
    
    /** Reverses the FxVector. */
    void reverse()
    {
        std::reverse( std::begin(_data), std::end(_data) );
    }
    
    /** Requests the container to reduce its capacity to fit its size. */
    void shrinkToFit()
    {
        _data.shrink_to_fit();
    }
    
protected:
    
    /** Retains all the objects in the vector */
    void addRefForAllObjects()
    {
        for(const auto &obj : _data) {
            obj->retain();
        }
    }
    
    std::vector<T> _data;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxVector_hpp */
